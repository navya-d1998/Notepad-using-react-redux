class Auth{
    constructor(){
        this.authenticated=localStorage.getItem("userName")?true:false;
    }
    login(commands){
        this.authenticated = true;
        commands();
    }
    logout(commands){
        console.log("logging out")
        this.authenticated = false;
        commands();
    }
    isAuthenticated(){
        return this.authenticated;
    }
}
export default new Auth();