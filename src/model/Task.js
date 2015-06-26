import Person from "./Person";
import Project from "./Project";
import Tasklist from "./Tasklist";

export default class Task {
    constructor(data) {
        this.id = data.id;
        this.title = data.title || data.content;
        this.description = data.description;
        this.status = data.status;
        this.priority = data.priority;
        this.tags = data.tags;
        this.progress = data.progress;
        this.parent = data.parent || parseInt(data.parentTaskId);
        this.dependencyCount = data.dependencyCount || parseInt(data["has-dependencies"]);
        this.attachmentCount = data.attachmentCount || parseInt(data["attachments-count"])
        this.project = new Project({
            id: (data.project ? data.project.id : null) || parseInt(data["company-id"]),
            name: (data.project ? data.project.name : null) || parseInt(data["company-name"])
        });

        this.tasklist = new Tasklist({
            id: (data.tasklist ? data.tasklist.id : null) || parseInt(data["todo-list-id"]),
            name: (data.tasklist ? data.tasklist.name : null) || data["todo-list-name"]
        });

        this.author = new Person({
            firstName: (data.author ? data.author.firstName : null) || data["creator-firstname"],
            lastName: (data.author ? data.author.lastName : null) || data["creator-lastname"],
            id: (data.author ? data.author.id : null) || parseInt(data["creator-id"])
        });

        if(data.assigned || data["responsible-party-id"]) {
            this.assigned = new Person({
                firstName: (data.assigned ? data.assigned.firstName : null) || data["responsible-party-firstname"],
                lastName: (data.assigned ? data.assigned.lastName : null) || data["responsible-party-lastname"],
                id: (data.assigned ? data.assigned.id : null) || parseInt(data["responsible-party-id"]),
            });
        }
    }

    toListItem() {
        var details = [];
        if(this.assigned) details.push(this.assigned.getNameInitialed());
        if(this.priority) details.push(this.priority);
        details = details.join(", ");
        
        return `${this.toString()} ${details ? "[" + details + "]" : ""}`;

    }

    toItem() {
        return `${this.toString()}\n` +
            `Assigned: ${this.assigned ? this.assigned.getNameInitialed() : "Anyone"}, Priority: ${this.priority}`
    }

    toString() {
        return `[#${this.id}] ${this.title} (${this.getProgress()})`
    }

    getProgress() {
        return `${this.progress}%`
    }
}