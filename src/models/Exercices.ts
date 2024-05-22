export default class Exercices {
  id: number;
  exerciseName: string;
  duration: number;
  description: string;
  feelings: number;
  material: any[];
  muscleGroup: any[];

  constructor(
    id: number,
    exerciseName: string,
    duration: number,
    description: string,
    feelings: number,
    material: any[],
    muscleGroup: any[]
  ) {
    this.id = id;
    this.exerciseName = exerciseName;
    this.duration = duration;
    this.description = description;
    this.feelings = feelings;
    this.material = material;
    this.muscleGroup = muscleGroup;
  }
}