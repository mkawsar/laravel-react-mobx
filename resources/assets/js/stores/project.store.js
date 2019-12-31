import axios from 'axios'
import { observable, action, computed } from 'mobx'


class Project {
	@observable name = 'Laravel with ReactJS';

	@observable values = {
		name: '',
		description: ''
	};

	@action
	setProjectName(name) {
		this.values.name = name;
	}

	@action
	setProjectDescription(description) {
		this.values.description = description;
	}

	@computed
	get getProjectName() {
		return this.values.name;
	}

	@computed
	get getProjectDescription() {
		return this.values.description;
	}

}

export default new Project();
