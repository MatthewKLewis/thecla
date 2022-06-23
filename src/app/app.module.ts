import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { JwtInterceptor } from 'src/interceptors/jwt.interceptor';
import { AuthGuard } from 'src/guard/auth.guard';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { SignInComponent } from './front-page/sign-in/sign-in.component';
import { SignUpComponent } from './front-page/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { ConfirmComponent } from './modal/confirm/confirm.component';
import { MapComponent } from './map/map.component';
import { MapCanvasComponent } from './map/map-canvas/map-canvas.component';
import { AddSettlementComponent } from './modal/add-settlement/add-settlement.component'; 
import { ModalComponent } from './modal/modal.component';
import { PeopleComponent } from './people/people.component';
import { CavesComponent } from './people/caves/caves.component'; 

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    NavbarComponent,
    SettlementsComponent,
    ModalComponent,
    ConfirmComponent,
    MapComponent,
    MapCanvasComponent,
    AddSettlementComponent,
    PeopleComponent,
    CavesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    JwtHelperService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
