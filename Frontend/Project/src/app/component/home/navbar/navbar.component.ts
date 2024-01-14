import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/interfaces/dataUserAuthen/userModel';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from '../../authen/auth.service';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  isExpanded: boolean = false;
  user!: userModel

  constructor(private _menuservice: MenuService, private authService: AuthService) {
    this.user = this.authService.user
  }

  ngOnInit(): void {
    this.loadmenu();
    console.log(this.menu)
  }

  async loadmenu() {
    await this._menuservice.getMenu().subscribe(data => {
      console.log(data);
      data.forEach(result => {
        result.role.forEach(async datarole => {
          if (datarole == this.user.role) {
            await this.menu.push(result);
          }
        })
      });
      this.navigatepath(this.menu)
    })
  }

  navigatepath(menu: Menu[]) {
    menu.forEach(data => {
      if (data.name == "Course" && this.user.role == "Teacher") {
        data.direct = `/home/course/tec/${this.user.id}`
      }

      if (data.name == "My Course" && this.user.role == "Student") {
        data.direct = `/home/course/${this.user.id}`
      }

      if (data.name == "Edit Profile" && this.user.role == "Student") {
        data.direct = `/home/edit-student/${this.user.id}`
      }

      if (data.name == "Edit Profile" && this.user.role == "Teacher") {
        data.direct = `/home/edit-teacher/${this.user.id}`
      }

    })
  }



  logout() {
    localStorage.removeItem('Authorization');
  }
}
