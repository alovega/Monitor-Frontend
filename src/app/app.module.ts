import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorsModule } from './errors/errors.module';
import { FooterComponent } from './layout/footer/footer.component';
import { TopNavComponent } from './layout/navigation/top-nav/top-nav.component';
import { SideNavComponent } from './layout/navigation/side-nav/side-nav.component';
<<<<<<< HEAD
import { EndpointModule } from './endpoint/endpoint.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipientsModule } from './recipients/recipients.module';
=======
import { ViewModule } from './view/view.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 340b876fc43d7302cdcc7f2d641c1e6bfd0756ed

@NgModule({
  declarations: [
    AppComponent, FooterComponent, TopNavComponent, SideNavComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBCMBffWFPoWuR8mMDe56nDKI4A9mf55k'
    }),
    EndpointModule,
    RecipientsModule,
    AppRoutingModule,
    DashboardModule,
<<<<<<< HEAD
    ErrorsModule
=======
    ErrorsModule,
    BrowserAnimationsModule
>>>>>>> 340b876fc43d7302cdcc7f2d641c1e6bfd0756ed
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
