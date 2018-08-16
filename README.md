<span id="hs_cos_wrapper_post_body" class="hs_cos_wrapper hs_cos_wrapper_meta_field hs_cos_wrapper_type_rich_text" style="" data-hs-cos-general-type="meta_field" data-hs-cos-type="rich_text">
  
<!--more--><p>If you have used the Microsoft Identity system, you know it creates a set of "AspNet" tables. One of these tables is AspNetUserClaims into which you may assign a claim name and the value for the claim. You can think of claims like permissions. A claim may be something like 'I can add a Product', 'I can save a Product'. You can assign one or more claims to a user, or to a role.</p>

<p>To demonstrate how to apply security to an Angular application, I created a sample application with a few pages to display products, display a single product, and display a list of product categories</p>
<p>This article assumes you have the following tools installed.</p>
<ul>
<li>Visual Studio Code</li>
<li>Node</li>
<li>Node Package Manager (npm)</li>
<li>Angular CLI</li>
</ul>
<h2>A Look at the Sample Application</h2>
<p>In the sample you downloaded, there are two menus, Products and Categories (Figure 1), that you may wish to turn off based on claims assigned to a user. On the product and category list pages (Figure 1), you may want to turn off the Add button based on claims.</p>
<p><img src="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=548&amp;height=354&amp;name=SecClaims-Figure1.png" alt="SecClaims-Figure1.png" width="548" height="354" srcset="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=274&amp;height=177&amp;name=SecClaims-Figure1.png 274w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=548&amp;height=354&amp;name=SecClaims-Figure1.png 548w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=822&amp;height=531&amp;name=SecClaims-Figure1.png 822w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=1096&amp;height=708&amp;name=SecClaims-Figure1.png 1096w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=1370&amp;height=885&amp;name=SecClaims-Figure1.png 1370w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure1.png?t=1533658915285&amp;width=1644&amp;height=1062&amp;name=SecClaims-Figure1.png 1644w" sizes="(max-width: 548px) 100vw, 548px"></p>
<p>Figure 1: Product list page</p>
<p>On the product detail page (Figure 2), the Save button may be something you wish to turn off. Perhaps someone can view product detail, but not modify the data.</p>
<p><img src="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=560&amp;height=509&amp;name=SecClaims-Figure2.png" alt="SecClaims-Figure2.png" width="560" height="509" srcset="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=280&amp;height=255&amp;name=SecClaims-Figure2.png 280w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=560&amp;height=509&amp;name=SecClaims-Figure2.png 560w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=840&amp;height=764&amp;name=SecClaims-Figure2.png 840w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=1120&amp;height=1018&amp;name=SecClaims-Figure2.png 1120w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=1400&amp;height=1273&amp;name=SecClaims-Figure2.png 1400w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure2.png?t=1533658915285&amp;width=1680&amp;height=1527&amp;name=SecClaims-Figure2.png 1680w" sizes="(max-width: 560px) 100vw, 560px"></p>
<p>Figure 2: Turn off the Save button based on claims</p>
<p>Finally, on the Categories page (Figure 3), you may wish to make the Add New Category button invisible if someone does not have the appropriate claims.</p>
<div><img src="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=568&amp;height=350&amp;name=SecClaims-Figure3.png" alt="SecClaims-Figure3.png" width="568" height="350" srcset="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=284&amp;height=175&amp;name=SecClaims-Figure3.png 284w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=568&amp;height=350&amp;name=SecClaims-Figure3.png 568w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=852&amp;height=525&amp;name=SecClaims-Figure3.png 852w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=1136&amp;height=700&amp;name=SecClaims-Figure3.png 1136w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=1420&amp;height=875&amp;name=SecClaims-Figure3.png 1420w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure3.png?t=1533658915285&amp;width=1704&amp;height=1050&amp;name=SecClaims-Figure3.png 1704w" sizes="(max-width: 568px) 100vw, 568px"></div>
<p>Figure 3: Turn off the Add New Category button based on permissions</p>
<h2>Create User Security Classes</h2>
<p>To secure an application, you need a couple of classes to hold user information. First, you need a user class to hold the user name and password that can be entered on a login page and verified against some data source. In the first part of this article, a mock set of logins is used for verification. Secondly, a user authentication/authorization class is used with properties for each item in your application you wish to secure.</p>
<p>Next, you need a security service class to authenticate a user and set properties in the user authentication/authorization object. The property values determine the permissions for the logged in user. You use the properties to turn on and off different menus, buttons or other UI elements on your pages.</p>
<h3>User Class</h3>
<p>Create the user class to hold the user name and password the user entered intothe login page. Right mouse-click on the \src\app folder and add a new folder named <strong>security</strong>. Right mouse-click on the new security folder and add a file named <strong>app-user.ts</strong>. Add two properties into this AppUser class as shown in the following code.</p>
<pre>  export class AppUser  {
    userName: string = "";
    password: string = "";
  }
  </pre>
<h3>AppUserClaim Class</h3>
<p>To represent claims, create a class named AppUserClaim. This class mimics the Microsoft Identity table "AspNetUserClaims". Right mouse-click on the security folder and add a new file named <strong>app-user-claim.ts</strong> . Add the following code in this file.</p>
<pre>  export class AppUserClaim  {
    claimId: number = 0;
    userId: number = 0;
    claimType: string = "";
    claimValue: string = "";
  }
  </pre>
<h3>User Authentication/Authorization Class</h3>
<p>It is now time to create a class with an array of claims that will be used to turn menus and button off and on. Right mouse-click on the<strong>security</strong> folder and add a new file named <strong>app-user-auth.ts</strong>. This class contains the <em>userId</em> and <em>userName</em> properties to hold the user id and name of the authenticated user, a <em>bearerToken</em> to be used when interacting with Web API calls, and a boolean property named <em>isAuthenticated</em>, which is only set to true when a user has been authenticated. The final property, <em>claims</em>, holds an array of claims. These claims are going to be hard-coded in this application, but in a future article, you will retrieve these via a Web API call.</p>
<pre>  import { AppUserClaim } from "./app-user-claim";

  export class AppUserAuth {
    userId: number = 0;
    userName: string = "";
    bearerToken: string = "";
    isAuthenticated: boolean = false;
    claims: AppUserClaim[] = [];
  }
  </pre>
<h3>Login Mocks</h3>
<p>In this article, you are going to keep all authentication and authorization local within the Angular application. Right mouse-click on the<strong>security</strong> folder and add a new file named<strong>login-mocks.ts</strong>. Create a constant named <em>LOGIN_MOCKS</em> that is an array of AppUserAuth objects. Create a couple of literal objects to simulate two different user objects you might retrieve from a database on a backend server.</p>
<pre>  import { AppUserAuth } from "./app-user-auth";
  import { AppUserClaim } from "./app-user-claim";

  export const LOGIN_MOCKS: AppUserAuth[] = [
    {
      userId: 1,
      userName: "PSheriff",
      bearerToken: "abi393kdkd9393ikd",
      isAuthenticated: true,
      claims: [
        {
          userId: 1,
          claimId: 1,
          claimType: "isAuthenticated",
          claimValue: "true"
        },
        {
          userId: 1,
          claimId: 2,
          claimType: "canAccessProducts",
          claimValue: "true"
        },
        {
          userId: 1,
          claimId: 3,
          claimType: "canAddProduct",
          claimValue: "true"
        },
        {
          userId: 1,
          claimId: 4,
          claimType: "canSaveProduct",
          claimValue: "true"
        },
        {
          userId: 1,
          claimId: 5,
          claimType: "canAccessCategories",
          claimValue: "true"
        },
        {
          userId: 1,
          claimId: 6,
          claimType: "canAddCategory",
          claimValue: "false"
        }
      ]
    },
    {
      userId: 2,
      userName: "BJones",
      bearerToken: "sd9f923k3kdmcjkhd",
      isAuthenticated: true,
      claims: [
        {
          userId: 2,
          claimId: 1,
          claimType: "isAuthenticated",
          claimValue: "true"
        },
        {
          userId: 2,
          claimId: 2,
          claimType: "canAccessProducts",
          claimValue: "false"
        },
        {
          userId: 2,
          claimId: 3,
          claimType: "canAddProduct",
          claimValue: "false"
        },
        {
          userId: 2,
          claimId: 4,
          claimType: "canSaveProduct",
          claimValue: "false"
        },
        {
          userId: 2,
          claimId: 5,
          claimType: "canAccessCategories",
          claimValue: "true"
        },
        {
          userId: 2,
          claimId: 6,
          claimType: "canAddCategory",
          claimValue: "true"
        }
      ]
    }
  ];
  </pre>
<h2>Security Service</h2>
<p>Angular is all about services, so create a security service class to authenticate a user and return a user's authorization object with the appropriate properties. Open a VS Code terminal window and type in the following command to generate a service class named SecurityService. Add the -m option to register this service in the app.module file.</p>
<pre>  ng g s security/security --flat -m app.module
  </pre>
<p>Open the generated <strong>security.service.ts</strong> file and add the following import statements.</p>
<pre>  import { Observable } from 'rxjs/Observable';
  import { of } from 'rxjs/observable/of';
  import { AppUserAuth } from './app-user-auth';
  import { AppUser } from './app-user';
  import { LOGIN_MOCKS } from './login-mocks';
  import { AppUserClaim } from './app-user-claim';
  </pre>
<p>Add a property named <em>securityObject</em> to the SecurityService class to hold the user authorization object. Initialize this object to a new instance of the AppUserAuth class so it creates the object in memory.</p>
<pre>  securityObject: AppUserAuth = new AppUserAuth();
  </pre>
<h3>Reset Security Object Method</h3>
<p>Once you have created this security object, you do not ever want to reset it to a new object; instead, just change the properties of this object when a new user authenticates. Add a method to reset this security object to a default value.</p>
<pre>  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];

    localStorage.removeItem("bearerToken");
  }
  </pre>
<h3>Login Method</h3>
<p>Soon, you are going to create a login page. That login component creates an instance of the AppUser class and binds the properties in that class to input fields on the page. Once the user has typed in their user name and password, this instance of the AppUser class is going to be passed to a login() method in the SecurityService class to determine if the user exists. If the user exists, the appropriate properties are filled into a AppUserAuth object and returned from the login() method.</p>
<pre>  login(entity: AppUser): Observable {
    // Initialize security object
    this.resetSecurityObject();

    // Use object assign to update the current object
    // NOTE: Don't create a new AppUserAuth object
    //       because that destroys all references to object
    Object.assign(this.securityObject, LOGIN_MOCKS.find(user =&gt; user.userName.toLowerCase() === entity.userName.toLowerCase()));

    if (this.securityObject.userName !== "") {
      // Store into local storage
      localStorage.setItem("bearerToken",
        this.securityObject.bearerToken);
    }

    return of(this.securityObject);
  }
  </pre>
<p>The first thing to do is to reset the security object, so the resetSecurityObject() is called. Next, you use the Object.assign() method to replace all the properties in the securityObject property with the properties from the AppUserAuth object returned from the find() method on the <em>LOGIN_MOCKS</em> array. If the user is found, the bearer token is stored into local storage. This is done so that when you need to pass this value to the Web API, it is available and ready to use. This article is not going to cover that, but a future article will.</p>
<h3>Logout Method</h3>
<p>If you have a login method, you should always have a logout() method. The logout() method resets the properties in the <em>securityObject</em> property to empty fields, or false values. Resetting the properties (as opposed to creating a new instance of the class), keeps any bound properties on the <em>securityObject</em> from being thrown away. For instance, if you are turning off a menu such as the Products menu based on the value in the <em>isAuthenticated</em> property, if you create a new instance of the security Object, that bound property is released, and your menu visibility no longer works.</p>
<pre>  logout(): void {
    this.resetSecurityObject();
  }
  </pre>
<h2>Login Page</h2>
<p>Now that you have a security service to perform a login, you need to retrieve a user name and password from the user. Create a Login page by opening a terminal window and type in the following command to generate a login page.</p>
<pre>  ng g c security/login --flat -m app.module
  </pre>
<p>Open the <strong>login.component.html</strong> file and delete the HTML that was generated. Create three distinct rows on the new login page.</p>
<ol>
<li>Invalid User Name/Password message.</li>
<li>Row to display the instance of the securityObject property.</li>
<li>Panel for entering user name and password.</li>
</ol>
<p>Use Bootstrap styles to create each of these rows on this login page. The first div contains a *ngIf directive to only display the message if the securityObject exists, and the <em>isAuthenticated</em> property is false. The second div element contains a binding to the <em>securityObject</em> property. This object is sent to the <strong>json</strong> pipe to display the object as a string within a label element. The last row is a Bootstrap panel into which you place the appropriate user name and password input fields.</p>
<pre>  &lt;div class="row"&gt;
    &lt;div class="col-xs-12"&gt;
      &lt;div class="alert alert-danger" 
      *ngIf="securityObject &amp;&amp;
             !securityObject.isAuthenticated"&gt;
        &lt;p&gt;Invalid User Name/Password.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- TEMPORARY CODE TO VIEW SECURITY OBJECT --&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-xs-12"&gt;
      &lt;label&gt;&lt;/label&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;form&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-xs-12 col-sm-6"&gt;
        &lt;div class="panel panel-primary"&gt;
          &lt;div class="panel-heading"&gt;
            &lt;h3 class="panel-title"&gt;Log in&lt;/h3&gt;
          &lt;/div&gt;
          &lt;div class="panel-body"&gt;
            &lt;div class="form-group"&gt;
              &lt;label for="userName"&gt;User Name&lt;/label&gt;
              &lt;div class="input-group"&gt;
                &lt;input id="userName" name="userName" 
                       class="form-control" required
                       [(ngModel)]="user.userName"
                       autofocus="autofocus" /&gt;
                &lt;span class="input-group-addon"&gt;
                  &lt;i class="glyphicon glyphicon-envelope"&gt;&lt;/i&gt;
                &lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="form-group"&gt;
              &lt;label for="password"&gt;Password&lt;/label&gt;
              &lt;div class="input-group"&gt;
                &lt;input id="password" name="password" 
                       class="form-control" required 
                       [(ngModel)]="user.password"
                       type="password" /&gt;
                &lt;span class="input-group-addon"&gt;
                  &lt;i class="glyphicon glyphicon-lock"&gt;&lt;/i&gt;
                &lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div class="panel-footer"&gt;
            &lt;button class="btn btn-primary" (click)="login()"&gt;
              Login
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/form&gt;
  </pre>
<h3>Modify Login Component TypeScript</h3>
<p>As you can see from the HTML you entered in the login.component.html file, there are two properties required for binding to the HTML elements;<em>user</em> and <em>securityObject</em>. Open the <strong>login.component.ts</strong> file and add the following import statements; or, if you wish, use VS Code to insert them for you as you add each class.</p>
<pre>  import { AppUser } from './app-user';
  import { AppUserAuth } from './app-user-auth';
  import { SecurityService } from './security.service';
  </pre>
<p>Add two properties to hold the user and the user authorization object.</p>
<pre>  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  </pre>
<p>To set the <em>securityObject</em> property, inject the SecurityService into the constructor of this class.</p>
<pre>  constructor(private securityService: SecurityService) { }
  </pre>
<p>The button in the footer area of the Bootstrap panel binds the click event to a method named login(). Add this login() method as shown below. The login() method on the SecurityService class is subscribed, and the response returned is assigned into the <em>securityObject</em> property defined in this login component.</p>
<pre>  login() {
    this.securityService.login(this.user)
      .subscribe(resp =&gt; {
        this.securityObject = resp;
      });
  }
  </pre>
<h2>Add Login Menu</h2>
<p>Now that you have a login page and a valid security object, you need to add a Login menu. The menu system is created in the <strong>app.component.html </strong>file, so you need to open that file and add a new menu item to call the login page. Add the following HTML below the closing &lt;/ul&gt; tag used to create the other menus. This HTML creates a right-justified menu that displays the word "Login" when the user is not yet authenticated. Once authenticated, the menu changes to Logout &lt;User Name&gt;.</p>
<pre>  &lt;ul class="nav navbar-nav navbar-right"&gt;
    &lt;li&gt;
      &lt;a routerLink="login" *ngIf="!securityObject.isAuthenticated"&gt;
        Login
      &lt;/a&gt;
      &lt;a href="#" (onclick)="logout()" *ngIf="securityObject.isAuthenticated"&gt;
        Logout 
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
  </pre>
<h3>Modify the AppComponent Class</h3>
<p>As you saw from the HTML you entered, you need to add a <em>securityObject</em> property to the component associated with the app. Open the <strong>app.component.ts </strong>file and add the <em>securityObject</em> property. Assign this property to a null value so the Invalid User Name/Password message does not display on the page.</p>
<pre>  securityObject: AppUserAuth = null;
  </pre>
<p>Add a constructor to the AppComponent class to inject the SecurityService and assign the <em>securityObject</em> property from the SecurityService class to the property you just created.</p>
<pre>  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }
  </pre>
<p>Add a logout() method to this class that calls the logout() method on the security service class. This method is bound to the click event on the Logout menu item you added in the HTML.</p>
<pre>  logout(): void { 
    this.securityService.logout();
  }
  </pre>
<h3>Add Login Route</h3>
<p>To get to the login page, you need to add a route. Open the <strong>app-routing.module.ts</strong> file and add a new route like the one shown below.</p>
<pre>  {
    path: 'login', 
    component: LoginComponent
  },
  </pre>
<h3>Try it Out</h3>
<p>Save all the changes you have made so far. Start the application using <strong>npm start</strong>. Click the Login menu and login with "psheriff" and notice the properties that are set in the returned security object. Click the Logout button, then login back in as "bjones" and notice that different properties are set.</p>
<p><img src="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=570&amp;height=361&amp;name=SecClaims-Figure4.png" alt="SecClaims-Figure4.png" width="570" height="361" srcset="https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=285&amp;height=181&amp;name=SecClaims-Figure4.png 285w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=570&amp;height=361&amp;name=SecClaims-Figure4.png 570w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=855&amp;height=542&amp;name=SecClaims-Figure4.png 855w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=1140&amp;height=722&amp;name=SecClaims-Figure4.png 1140w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=1425&amp;height=903&amp;name=SecClaims-Figure4.png 1425w, https://blog.fairwaytech.com/hs-fs/hubfs/SecClaims-Figure4.png?t=1533658915285&amp;width=1710&amp;height=1083&amp;name=SecClaims-Figure4.png 1710w" sizes="(max-width: 570px) 100vw, 570px"></p>
<p>Figure 4: You can see all the various claims in the returned object for this logged in user.</p>
<h2>Check for Claims</h2>
<p>Open the <strong>security.service.ts</strong> file and add a new method named isClaimValid() to check if a user has a specified claim. This method accepts two parameters; <em>claimType</em> and <em>claimValue</em>. The <em>claimValue</em> parameter is optional. Into the claimType parameter you may pass a claim like 'canAccessProduct' and if nothing is passed for the <em>claimValue</em> parameter, then the array of claims is searched for a claim that has <em>claimType</em> equals the value passed in, and the <em>claimValue</em> is equal to "true". If the claimValue is passed, then the <em>claims</em> array is searched for the <em>claimType</em> and the <em>claimValue</em> equal to what is passed in.</p>
<p>Another way to call this method is to pass the claim type and claim value in the <em>claimType</em> parameter separated by a colon. For example, you can pass "canAccessProducts:false" to the <em>claimType</em> parameter, and there is code in here to check if a colon exists and to separate out the claim type and the claim value before searching for these values in the <em>claims</em> array.</p>
<pre>  private isClaimValid(claimType: string, claimValue?: string) {
    let ret: boolean = false;
    let auth: AppUserAuth = null;

    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(":") &gt;= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0];
        claimValue = words[1];
      }
      else {
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : "true";
      }
      // Attempt to find the claim
      ret = auth.claims.find(c =&gt; c.claimType == claimType &amp;&amp; c.claimValue == claimValue) != null;
    }

    return ret;
  }
  </pre>
<p>The isClaimValid is a private method in the security service class, so you need a public method to call this one. Create a hasClaim() method that looks like the following.</p>
<pre>  hasClaim(claimType: any, claimValue?: any) {
    return this.isClaimValid(claimType, claimValue);
  }
  </pre>
<p>The above method is very simple, but later, you are going to add code to check for an array of claims to be passed in, so just create this simple method for now.</p>
<h3>Has Claim Structural Directive</h3>
<p>When you do not have properties to bind to on a class, but instead you have an array of objects, you can't use data-binding to secure buttons and menus. Instead you can use a structural directive like the *ngIf directive. You want to create a directive that can attach to a UI element like the following:</p>
<pre>  &lt;button class="btn btn-primary" (click)="addProduct()" <strong>*hasClaim="'canAddProduct'"</strong>&gt;
    Add New Product
  &lt;/button&gt;
  </pre>
<p>The directive is passed the value within the quotes as a string, checks the security object to see if that claim exists in the array for the current user, and if that claim value is true. If so, then the button is displayed, otherwise it is removed from the DOM.</p>
<p>Create this hasClaim Angular structural directive by opening a terminal window in Code and typing in the following command.</p>
<pre>  ng g d security/hasClaim --flat -m app.module
  </pre>
<p>Open the <strong>has-claim.directive.ts</strong> file and modify the import statement to add a few more classes.</p>
<pre>  import { Directive<strong>, Input, TemplateRef, ViewContainerRef</strong> } from '@angular/core';
  </pre>
<p>Modify the <em>selector</em> property from <strong>ptcHasClaim</strong> to <strong>hasClaim</strong>.</p>
<pre>  @Directive({ selector: '[hasClaim]' })
  </pre>
<p>Modify the constructor to inject the TemplateRef, ViewContainerRef and the SecurityService.</p>
<pre>  constructor(
    private templateRef: TemplateRef&lt;any&gt;,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService) { }
  </pre>
<p>Add the following @Input property to accept data from the right-hand side of the equal sign of the hasClaim directive as shown earlier.</p>
<pre>  @Input() set hasClaim(claimType: any) {
    if (this.securityService.hasClaim(claimType)) {
      // Add template to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      // Remove template from DOM
      this.viewContainer.clear();
    }
  }
  </pre>
<p>The @Input() decorator tells Angular to pass the value to this property defined in the directive. The claimType is passed to the hasClaim() method you created earlier in the security service class. If the claim exists, the UI element to which this directive is applied is displayed on the screen.</p>
<h3>Secure Add New Product Button</h3>
<p>Try out your new directive by opening the <strong>product-list.component.ts</strong> file and adding this directive to the Add New Product button as shown in the code below.</p>
<pre>  &lt;button class="btn btn-primary" (click)="addProduct()" <strong>*hasClaim="'canAddProduct'"</strong>&gt;
    Add New Product
  &lt;/button&gt;
  </pre>
<p>Don't forget to add the single quotes inside the double quotes. If you forget them, Angular is going to try to bind to a property in your component named <em>canAddProduct</em> which does not exist.</p>
<h3>Try it Out</h3>
<p>Save all your changes and go back to the browser. Click on the Login menu and login as "psheriff". Click on the Products menu and you should see the Add New Product button appear. Logout psheriff and login as "bjones". The Add New Product button should now be gone. You may specify the value you want the claim to be by adding a colon, followed by the value after the claim name.</p>
<pre>  &lt;button class="btn btn-primary" (click)="addProduct()" *hasClaim="'canAddProduct<strong>:false</strong>'"&gt;
    Add New Product
  &lt;/button&gt;
  </pre>
<p>If you now login as "psheriff", the Add New Product button is gone. Login as "bjones" and it should appear. Remove the ":false" from the claim after you have tested this out.</p>
<h2>Add Multiple Claims</h2>
<p>Sometimes your security requirements are such that you need to secure a UI element using multiple claims. For example, you want to display a button for people that have one claim, and for people that have another claim. To accomplish this, you need to pass an array of claims to the hasClaim directive as shown below.</p>
<div>*hasClaim="<strong>['canAddProduct', 'canAccessCategories']</strong>"</div>
<p>You need to modify the hasClaim method in the SecurityService class to check to see if just a single string value has been passed, or an array. Open the <strong>security.service.ts</strong> file and modify the hasClaim method to look like the following.</p>
<pre>  // This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value',
                 'claimType3']"
  hasClaim(claimType: any, claimValue?: any) {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof claimType === "string") {
      ret = this.isClaimValid(claimType, claimValue);
    }
    else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index &lt; claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }
  </pre>
<p>As you now have two different data types that can be passed to the hasClaim() method, use the typeof operator to check if the <em>claimType</em> parameter is a string. If it is, call the isClaimValid() method passing in the two parameters. If it is not a string, assume it is an array. Cast the <em>claimType</em> parameter into a string array named claims. Verify it is an array, then loop through each element of the array and pass each element to the isClaimValid() method. If even one claim matches, then return a true from this method so the UI element is displayed.</p>
<h3>Secure Other Buttons</h3>
<p>Open the <strong>product-list.component.html</strong> file and modify the Add New Product button to use an array.</p>
<pre>  *hasClaim="<strong>['canAddProduct', 'canAccessCategories']</strong>"
  </pre>
<p>Open the <strong>product-detail.component.html</strong> file and modify the Save button.</p>
<pre>   &lt;button class="btn btn-primary" (click)="saveData()"
  <strong>*hasClaim="'canSaveProduct'"</strong>&gt;
    Save
  &lt;/button&gt;
  </pre>
<p>Open the <strong>category-list.component.html</strong> file and modify the Add New Category button.</p>
<pre>  &lt;button class="btn btn-primary" (onclick)="addCategory()"
  <strong>*hasClaim="'canAddCategory'"</strong>&gt;
    Add New Category
  &lt;/button&gt;
  </pre>
<h3>Try it Out</h3>
<p>Save all the changes in your application and go back to your browser. Login as "bjones" and because he has the canAccessCategories claim, he is allowed to view the Add New Product button. Change the hasClaim attribute in the <strong>product-list.component.html</strong> file so it is a single value again.</p>
<pre>  *hasClaim="<strong>'canAddProduct'</strong>"
  </pre>
<h3>Try it Out</h3>
<p>Save all the changes and test the application to make sure that when you are logged in with the correct user, you see the correct buttons.</p>
<h2>Create Observer Pattern</h2>
<p>One consideration when using a structural directive that passes in a string value, instead of binding to a property on the component, is that if the securityObject gets a new set of claims due to a change in who is logged in, there is no automatic refresh since there is no binding. This means that you need to come up with some other mechanism to inform the AppComponent page that claims have changed and any menus that are secured, need to potentially be re-displayed, or hidden. One method you can employ is an observer pattern where you inform any observers of the <em>securityObject</em> property in the security service that something has changed.</p>
<p>Open the <strong>security.service.ts</strong> file and add the following import statement. This BehaviorSubject class from RxJS allows you to setup an observable and an observer. The reason to use a BehaviorSubject as opposed to a normal Observable is a BehaviorSubject allows you to send a message to any observers.</p>
<pre>  import { BehaviorSubject } from 'rxjs/BehaviorSubject';
  </pre>
<p>Create a private property named <em>hasChanged</em> and assign it to a generic number of the type of BehaviorSubject. Assign that object an initial value of zero. It doesn't matter what the initial value is.</p>
<pre>  private hasChanged = new BehaviorSubject&lt;number&gt;(0);
  </pre>
<p>Next, create a public observable called <em>securityReset</em>. It is this public property that any observer can subscribe to receive changes to the value.</p>
<pre>  securityReset = this.hasChanged.asObservable();
  </pre>
<p>When a new user logs in, you want to inform any observer that the <em>securityObject</em> property has received a new set of claims, and a new user. To inform them, call the next() method on the private <em>hasChanged</em> property and pass in any value.</p>
<pre>login(entity: AppUser): Observable&lt;AppUserAuth&gt; {
  // Initialize security object
  this.resetSecurityObject();

  // Use object assign to update the current object
  // NOTE: Don't create a new AppUserAuth object
  //       because that destroys all references to object
  Object.assign(this.securityObject,
    LOGIN_MOCKS.find(user =&gt; user.userName.toLowerCase() ===
      entity.userName.toLowerCase()));
  if (this.securityObject.userName !== "") {
    // Store into local storage
    localStorage.setItem("bearerToken",
      this.securityObject.bearerToken);

  <strong>
    // Inform everyone that the security object has changed.
    this.hasChanged.next(0);
    </strong>
  }

  return of&lt;AppUserAuth&gt;(this.securityObject);
}
  </pre>
<p>Modify the resetSecurityObject() method to also inform all observers that the <em>securityObject</em> property has changed.</p>
<pre>  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];
    
    <strong>
    // Inform everyone that the security object has changed.
    this.hasChanged.next(0);</strong>

    localStorage.removeItem("bearerToken");
  }
  </pre>
<h2>Secure Menus</h2>
<p>Now that you have a method to communicate that the <em>securityObject</em> property in the security service class have changed, you may now secure the menus in the app.component.html file. For each menu you wish to secure, you are going to create a property for each one. When the <em>securityObject</em> changes you query the security service class to see if the corresponding claim for that property is true or false. If the value is true, then the menu property is updated and the menu is displayed, and vice versa. Open <strong>app.component.html</strong> file and add the *ngIf directive to the two menu items.</p>
<pre>  &lt;li&gt;&lt;a routerLink="/products" <strong>*ngIf="canAccessProducts"</strong>&gt;Products&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a routerLink="/categories" <strong>*ngIf="canAccessCategories"</strong>&gt;Categories&lt;/a&gt;&lt;/li&gt;
  </pre>
<p>Open the <strong>app.component.ts</strong> file and modify the first import statement to add a couple of interfaces. Also, import the Subscription class from RxJS. This helps you setup an observer to the <em>securityObject</em> property in the security service class.</p>
<pre>  import { Component<strong>, OnInit, OnDestroy</strong> } from '@angular/core';
  <strong>import { Subscription } from 'rxjs/Subscription';</strong>
  </pre>
<p>Modify the class definition to add the two additional methods you need to add to use the observer pattern.</p>
<pre>  export class AppComponent <strong>implements OnInit, OnDestroy</strong>
  </pre>
<p>Add three new properties;<em>subscription, canAccessProducts, canAccessCategories</em>. The <em>subscription</em> property is used as the observer to the securityObject in the security service class. The other two properties are for binding to the menus in the app.component.html file.</p>
<pre>  subscription: Subscription;
  canAccessProducts: boolean = false;
  canAccessCategories: boolean = false;
  </pre>
<p>Add an updateProperties() method to update each of the menu properties by calling the hasClaim() method in the security service class.</p>
<pre>  private updateProperties() {
    this.canAccessProducts = this.securityService.hasClaim("canAccessProducts", "true");
    this.canAccessCategories = this.securityService.hasClaim("canAccessCategories", "true");
  }
  </pre>
<p>Add an ngOnInit() method and setup your observer in this method. During the subscribe you call the updateProperties() method to modify the values in those menu properties each time the <em>securityObject</em> property changes in the security service class.</p>
<pre>  ngOnInit() {
    this.subscription = this.securityService.securityReset
      .subscribe(() =&gt; this.updateProperties());
  }
  </pre>
<p>When you are explicitly creating your own subscription and not using something created by Angular, you need to unsubscribe from that subscription when you are done. Add an ngOnDestroy() method to this class and call the unsubscribe() method when this component is destroyed.</p>
<pre>  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
  </pre>
<h3>Try it Out</h3>
<p>Save all your changes, go to the browser and try logging in and out using the different user names. Every time you login and logout, the menus should change.</p>
<h2>Secure Routes Using a Guard</h2>
<p>Even though you can control the visibility of menu items, just because you can't click on them doesn't mean you can't get to the route. You can type the route directly into the browser address bar and you can get to the products page even if you don't have the <em>canAccessProducts</em> claim.</p>
<p>To protect the routes based on claims, you need to build a Route Guard. A Route Guard is a special class in Angular to determine if a page can be activated, or even deactivated. Let's learn how to build a CanActivate guard. Open a terminal and create a new guard named AuthGuard.</p>
<pre>  ng g g security/auth --flat -m app.module
  </pre>
<p>To protect a route, open the <strong>app-routing.module.ts</strong> file and add the <em>canActivate</em> property to those paths you wish to secure. You pass one or many guards to this property. In this case, add the AuthGuard class to the array of guards. For each route, specify the name of the claim to check that is associated with this route. Add a data property and pass in a property named <em>claimType</em> and set the value to the name of the claim associated with the route. This <em>data</em> property is passed to each Guard listed in the <em>canActivate</em> property.</p>
<pre>  {
    path: 'products',
    component: ProductListComponent<strong>,</strong>
   <strong> canActivate: [AuthGuard],</strong>
   <strong> data: {claimType: 'canAccessProducts'}</strong>
  },
  {
    path: 'productDetail/:id',
    component: ProductDetailComponent<strong>,</strong>
   <strong> canActivate: [AuthGuard],</strong>
   <strong> data: { claimType: 'canAccessProducts'}</strong>
  },
  {
    path: 'categories',
    component: CategoryListComponent<strong>,</strong>
   <strong> canActivate: [AuthGuard],</strong>
   <strong> data: { claimType: 'canAccessCategories'}</strong>
  },
  </pre>
<h3>Authorization Guard</h3>
<p>Let's write the appropriate code in the AuthGuard to secure the route. Since you are going to need to access the property passed in via the data property, open the <strong>auth-guard.ts</strong> file and add a constructor to inject the SecurityService.</p>
<pre>  constructor(private securityService: SecurityService) { }
  </pre>
<p>Modify the canActivate() method to retrieve the <em>claimType</em> property in the data property. Remove the "return true" statement and add the following lines of code in its place.</p>
<pre>  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable | Promise | boolean {
        
    <strong>// Get claim type on security object to check
    let claimType: string = next.data["claimType"];

    // Check security claim
    return this.securityService.hasClaim(claimType, "true");</strong>
  }
  </pre>
<p>Retrieve the <em>claimType</em> to validate using the <em>data</em> property on the ActivatedRouteSnaphot object passed into this method. A true value returned from this guard means the user has the right to navigate to this route.</p>
<h3>Try it Out</h3>
<p>Save all the changes you have made and go to the browser and type directly into the browser address bar <strong>http://localhost:4200/products</strong>. If you are not logged in, you are not able to get to the products page. Your guard is working; however, it ends up displaying a blank page. It would be better to redirect to the login page.</p>
<h2>Redirect to Login Page</h2>
<p>To redirect to the login page, modify the AuthGuard class to perform the redirection if the user is not authorized for the current route. Open the <strong>auth-guard.ts</strong> file and inject the Router service into the constructor.</p>
<pre>  constructor(private securityService: SecurityService,
              private router: Router) { }
  </pre>
<p>Modify the canActivate() method. Remove the current <strong>return</strong> statement and replace it with the following lines of code.</p>
<pre>  if (this.securityService.securityObject.isAuthenticated 
      &amp;&amp; this.securityService.hasClaim(claimType)) {
    return true;
  }
  else {
    this.router.navigate(['login'], 
        { queryParams: { returnUrl: state.url } });
    return false;
  }
  </pre>
<p>If the user is authenticated and authorized, the Guard returns a true and Angular goes to the route. Otherwise, use the Router object to navigate to the login page. Pass the current route the user was attempting to view as a query parameter. This places the route on the address bar for the login component to retrieve and use to go to the route requested after a valid login.</p>
<h3>Try it Out</h3>
<p>Save all your changes, go to the browser, and type directly into the browser address bar http://localhost:4200/products. The page will reset, and you will be directed to the login page. You should see a returnUrl parameter in the address bar. You can login, but you won't be redirected to the products page, you need to add some code to the login component.</p>
<h2>Redirect Back to Requested Page</h2>
<p>If the user logs in with the appropriate credentials that allows them to get to the requested page, then you want to direct them to that page after login. The LoginComponent class should return the <em>returnUrl</em> query parameter and attempt to navigate to that route after successful login. Open the <strong>login.component.ts</strong> file and inject the ActivatedRoute and the Router objects into the constructor.</p>
<pre>  constructor(private securityService: SecurityService<strong>,</strong>
             <strong> private route: ActivatedRoute,</strong>
             <strong> private router: Router</strong>) { }
  </pre>
<p>Add a property to this class to hold the return url, if any, that is retrieved from the address bar.</p>
<pre>  returnUrl: string;
  </pre>
<p>Add a line to the ngOnInit() method to retrieve this <em>returnUrl</em> query parameter. If you click on the Login menu directly, the queryParamMap.get() method returns a null.</p>
<pre>  ngOnInit() {
   <strong> this.returnUrl = </strong>
   <strong> this.route.snapshot.queryParamMap.get('returnUrl');</strong>
  }
  </pre>
<p>Locate the login() method and add code after setting the <em>securityObject</em> to test for a valid url and to redirect to that route if there is one.</p>
<pre>  login() {
    localStorage.removeItem("bearerToken");

    this.securityService.login(this.user)
      .subscribe(resp =&gt; {
        this.securityObject = resp;    
        <strong>if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }</strong>
    });
  }
  </pre>
<h3>Try it Out</h3>
<p>Save all your changes, go to the browser, and type directly into the browser address bar <strong>http://localhost:4200/products</strong> and you will be directed to login page. Login as "psheriff" and you are redirected to the products list page.</p>


<h2>Thanks To http://blog.fairwaytech.com/ <h2>
