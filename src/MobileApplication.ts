export default class MobileApplication {

    public onDeviceReady(): void {
        console.log("Fallbeispiel-Cordova: onDeviceReady");
    }

    public onResume(): void {
        console.log("Fallbeispiel-Cordova: onResume");
    }

    public onPause(): void {
        console.log("Fallbeispiel-Cordova: onPause");
    }

    public bindEvents(): void {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
    }

    public static readonly Instance: MobileApplication = new MobileApplication();
}