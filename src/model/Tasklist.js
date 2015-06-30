import Model from "../library/Model";
import Project from "./Project";

export default class Tasklist extends Model {
    /**
     * Create a new Tasklist object.
     * @param  {Object} data 
     *           {Number} :id
     *           {String} :name
     *           {String} :description
     *           {Object} :project - See Project#constructor
     */
    constructor(data) {
        super({
            id: true,
            name: true,
            description: false,
            complete: false,
            private: false,
            uncompletedCount: false,
            project: Project
        }, data);
    }    

    /**
     * Convert tasklist to a String.
     * @return {String}
     */
    toString() {
        return `[#${this.id}] ${this.name}`;
    }

    /**
     * Create a Task object from the Teamwork API.
     * @param {Object} data Data returned from Teamwork API.
     * @return {Task} 
     */
    static fromAPI(tasklist) {
        return new Tasklist({
            id: parseInt(tasklist.id),
            name: tasklist.name,
            description: tasklist.description,
            complete: tasklist.complete,
            private: tasklist.private,
            uncompletedCount: parseInt(tasklist['uncompleted-count']) || 0,
            project: {
                id: parseInt(tasklist.projectId),
                name: tasklist.projectName
            },
        });
    }
}