import data from './data_project.json'
var listProject = [];
for (const key in data) {
    let r = { key: key, value: data[key].name }
    listProject.push(r);
}

export default class Project {
    static getList() {
        return listProject;
    }

    
}