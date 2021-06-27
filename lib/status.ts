import {config} from 'config/config';
export class Status {
    application: any;
    getGeneralInfo() {
        this.application.node_version = process.version;
        this.application.name = config.appName;
        this.application.platform = process.platform;
        this.application.memory_usage = process.memoryUsage();
        this.application.uptime_min = process.uptime() / 60;
    }

    compile() {
        return Promise.resolve(this.application);
    }
}