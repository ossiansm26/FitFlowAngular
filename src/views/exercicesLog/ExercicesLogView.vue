<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-menu
          ref="startMenu"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDateFormatted"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title @input="updateStartDate"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
          ref="endMenu"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDateFormatted"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endDate" no-title @input="updateEndDate"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-carousel cycle hide-delimiters>
          <v-carousel-item v-for="(group, index) in groupedExerciseLogs" :key="index">
            <v-row>
              <v-col v-for="log in group" :key="log[0].id" cols="12" sm="6" md="3">
                <v-card class="mb-3 hoverable" @click="selectExercise(log)">
                  <v-card-title class="bg-primary text-white">{{ log[0].exercice.exerciseName }}</v-card-title>
                  <v-card-text>
                    <v-img v-if="log[0].exercice.urlImage" 
                      :src="getImageUrl(log[0].exercice.urlImage)"
                      :alt="log[0].exercice.exerciseName" 
                      contain class="exercise-card-image mb-3"
                    ></v-img>
                    <div>Description: {{ log[0].exercice.description }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-3">
          <v-card-title>Resumen</v-card-title>
          <v-card-text>
            <div>Fechas: {{ dateRange }}</div>
            <div>Total de Repeticiones: {{ totalReps }}</div>
            <div>Total de Peso Levantado: {{ totalWeight }}</div>
            <div>Máximo de Repeticiones: {{ maxReps }}</div>
            <div>Máximo de Peso: {{ maxWeight }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="downloadPDF">Descargar Datos en PDF</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <canvas id="exercise-progress-chart"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import 'chartjs-adapter-date-fns';
import 'jspdf-autotable';

Chart.register(...registerables);

export default {
  data() {
    return {
      exerciseLogs: [],
      groupedExerciseLogs: [],
      selectedExercise: null,
      chart: null,
      totalReps: 0,
      totalWeight: 0,
      maxReps: 0,
      maxWeight: 0,
      dateRange: '',
      startDate: null,
      endDate: null,
      startDateFormatted: '',
      endDateFormatted: '',
      menu1: false,
      menu2: false
    };
  },
  created() {
    this.fetchExerciseLogs();
  },
  methods: {
    getImageUrl(imageName) {
      return `http://localhost:3001/api/file/download/${imageName}`;
    },
    fetchExerciseLogs() {
      axios.get('http://localhost:3001/api/exerciceLog/getAllExerciceLog')
        .then(response => {
          console.log('Exercise Logs:', response.data);
          this.exerciseLogs = response.data;
          this.groupExercisesById();
          this.selectFirstExercise();
        })
        .catch(error => {
          console.error('Error fetching exercise logs:', error);
        });
    },
    groupExercisesById(filteredLogs = null) {
      const logs = filteredLogs || this.exerciseLogs;
      const grouped = logs.reduce((acc, log) => {
        const exerciseId = log.exercice.id;
        if (!acc[exerciseId]) {
          acc[exerciseId] = [];
        }
        acc[exerciseId].push(log);
        return acc;
      }, {});
      const groupedExerciseLogs = Object.values(grouped);
      const chunkedGroups = [];
      for (let i = 0; i < groupedExerciseLogs.length; i += 4) {
        chunkedGroups.push(groupedExerciseLogs.slice(i, i + 4));
      }

      this.groupedExerciseLogs = chunkedGroups;
    },
    selectFirstExercise() {
      if (this.groupedExerciseLogs.length > 0 && this.groupedExerciseLogs[0].length > 0) {
        this.selectExercise(this.groupedExerciseLogs[0][0]);
      }
    },
    selectExercise(log) {
      this.selectedExercise = log;
      this.updateChart();
      this.updateSummaries();
      this.updateDateRange();
    },
    updateStartDate() {
      this.startDateFormatted = this.formatDate(this.startDate);
      this.filterLogsByDate();
    },
    updateEndDate() {
      this.endDateFormatted = this.formatDate(this.endDate);
      this.filterLogsByDate();
    },
    formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const formattedDate = d.toISOString().split('T')[0];
  return formattedDate;
}
,
filterLogsByDate() {
  if (!this.startDate || !this.endDate) return;
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
 startDate.setDate(startDate.getDate() - 1);
  endDate.setDate(endDate.getDate() + 1);
  const filteredLogs = this.exerciseLogs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= startDate && logDate < endDate;
  });
  this.groupExercisesById(filteredLogs);
  this.selectFirstExercise();
}
,
    updateChart() {
      const ctx = document.getElementById('exercise-progress-chart').getContext('2d');
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      const labels = [];
      const repsData = [];
      const weightData = [];

      this.selectedExercise.forEach(log => {
        log.sets.forEach((set, index) => {
          labels.push(`${new Date(log.date).toLocaleDateString()} Set ${index + 1}`);
          repsData.push(set.reps);
          weightData.push(set.weight);
        });
      });

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Repeticiones',
              data: repsData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(18, 230, 230, 0.2)',
              borderWidth: 1,
              fill: true
            },
            {
              label: 'Peso',
              data: weightData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              fill: true
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Valor'
              }
            }
          }
        }
      });
    },
    updateSummaries() {
      const repsData = [];
      const weightData = [];

      this.selectedExercise.forEach(log => {
        log.sets.forEach(set => {
          repsData.push(set.reps);
          weightData.push(set.weight);
        });
      });

      this.totalReps = repsData.reduce((acc, curr) => acc + curr, 0);
      this.totalWeight = weightData.reduce((acc, curr) => acc + curr, 0);
      this.maxReps = Math.max(...repsData);
      this.maxWeight = Math.max(...weightData);
    },
    updateDateRange() {
      if (this.selectedExercise.length > 0) {
        const dates = this.selectedExercise.map(log => new Date(log.date));
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));
        this.dateRange = `${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`;
      }
    },
    downloadPDF() {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text('Datos de Ejercicios', 14, 16);

      doc.setFontSize(14);
      doc.setTextColor(40);
      let yOffset = 26;
      const summaryData = [
        `Fechas: ${this.dateRange}`,
        `Total de Repeticiones: ${this.totalReps}`,
        `Total de Peso Levantado: ${this.totalWeight}`,
        `Máximo de Repeticiones: ${this.maxReps}`,
        `Máximo de Peso: ${this.maxWeight}`
      ];

      summaryData.forEach((text) => {
        doc.text(text, 14, yOffset);
        yOffset += 8;
      });
      doc.setLineWidth(0.5);
      doc.line(14, yOffset, 196, yOffset);
      yOffset += 10;
      const tableColumn = ['Set', 'Repeticiones', 'Peso'];
      const tableRows = [];
      const groupedLogs = this.exerciseLogs.reduce((acc, log) => {
        const date = new Date(log.date).toLocaleDateString();
        const exerciseName = log.exercice.exerciseName;
        const key = `${date}-${exerciseName}`;
        if (!acc[key]) {
          acc[key] = {
            date: date,
            exerciseName: exerciseName,
            sets: []
          };
        }
        log.sets.forEach((set, index) => {
          acc[key].sets.push({
            set: `Set ${index + 1}`,
            reps: set.reps,
            weight: set.weight
          });
        });
        return acc;
      }, {});

      Object.values(groupedLogs).forEach(log => {
        tableRows.push([`${log.date} - ${log.exerciseName}`, '', '']);
        log.sets.forEach(set => {
          tableRows.push([set.set, set.reps, set.weight]);
        });
      });
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: yOffset,
        styles: {
          overflow: 'linebreak',
          cellPadding: 4,
          fontSize: 10,
          halign: 'center',
          valign: 'middle'
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontSize: 12
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        theme: 'striped',
        didDrawCell: (data) => {
          if (data.row.index === 0 && data.column.index === 0) {
            doc.setFont(undefined, 'bold');
          } else if (data.section === 'body' && data.column.index === 0 && !data.cell.raw.includes('Set')) {
            doc.setFont(undefined, 'normal');
          }
        }
      });
      const canvas = document.getElementById('exercise-progress-chart');
      const imageData = canvas.toDataURL('image/png');
      doc.addPage();
      doc.addImage(imageData, 'PNG', 10, 10, 180, 100);
      doc.save('exercise_logs.pdf');
    }
  },
  
};
</script>

<style scoped>
.exercise-card-image {
  height: 150px;
  object-fit: cover;
}
</style>
