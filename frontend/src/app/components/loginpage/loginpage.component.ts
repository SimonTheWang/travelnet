import { SocketService } from '../../services/socket.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-loginpage',
    templateUrl:'./loginpage.component.html'
})

export class LoginComponent{
    constructor(private SocketService: SocketService){
    }

    loginClicked(password, username, event: Event){
        // event.preventDefault()
        if(!(sessionStorage.getItem('username'))){
            this.SocketService.once('UserIn_res').subscribe((data: any) => {
                if (data.err) {
                    console.log(data.err)
                } 
                else if (data.res) {
                    sessionStorage.setItem('username', data.res)
                    console.log(sessionStorage.getItem('username'))
                }
            })
            this.SocketService.emit('UserIn', {email:username , password:password})
        } else {
            console.log('nothing')
        }
    }
}