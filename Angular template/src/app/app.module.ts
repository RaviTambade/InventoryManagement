import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CatagorySearchModule } from './catagory-search/catagory-search.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CatagorySearchModule,
    
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
