export default class Material {
    id: number;
    materialName: string;
    availabilityStatus: boolean;
    lastMaintenance: Date;

    constructor(id: number, materialName: string, availabilityStatus: boolean, lastMaintenance: Date) {
        this.id = id;
        this.materialName = materialName;
        this.availabilityStatus = availabilityStatus;
        this.lastMaintenance = lastMaintenance;
    }
}