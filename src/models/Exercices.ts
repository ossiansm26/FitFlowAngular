export default class Exercices {
  id: number;
  exerciseName: string;
  duration: number;
  description: string;
  repetitions: number;
  feelings: number;
  weight: number;
  material: any[];
  muscleGroup: any[];

  constructor(
    id: number,
    exerciseName: string,
    duration: number,
    description: string,
    repetitions: number,
    feelings: number,
    weight: number,
    material: any[],
    muscleGroup: any[]
  ) {
    this.id = id;
    this.exerciseName = exerciseName;
    this.duration = duration;
    this.description = description;
    this.repetitions = repetitions;
    this.feelings = feelings;
    this.weight = weight;
    this.material = material;
    this.muscleGroup = muscleGroup;
  }
}