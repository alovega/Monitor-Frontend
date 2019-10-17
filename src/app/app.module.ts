import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorsModule } from './errors/errors.module';
import { FooterComponent } from './layout/footer/footer.component';
import { TopNavComponent } from './layout/navigation/top-nav/top-nav.component';
import { SideNavComponent } from './layout/navigation/side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
// import { EndpointModule } from './endpoint/endpoint.module';
// import { RecipientsModule } from './recipients/recipients.module';

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
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    ErrorsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
