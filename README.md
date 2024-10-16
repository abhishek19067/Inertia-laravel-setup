
### Step 1: Create a New Laravel Project

```bash
laravel new project_name
```

### Step 2: Connect to Inertia.js

1. **Install Inertia.js with Composer**

   Navigate into your newly created project directory and run:

   ```bash
   composer require inertiajs/inertia-laravel
   ```

2. **Create the `app.blade.php` File**

   Create a new file at `resources/views/app.blade.php` and add the following code:

   ```html
   <html>
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
       @vite('resources/js/app.js')
       @inertiaHead
     </head>
     <body>
       @inertia
     </body>
   </html>
   ```

3. **Add Inertia Middleware**

   Run the following command to generate the necessary middleware:

   ```bash
   php artisan inertia:middleware
   ```

4. **Configure Middleware in `Bootstrap/app.php`**

   Open `bootstrap/app.php` and add the following code:

   ```php
   use App\Http\Middleware\HandleInertiaRequests;

   $app->make(\Illuminate\Foundation\Http\Kernel::class)
       ->withMiddleware(function ($middleware) {
           $middleware->web(append: [
               HandleInertiaRequests::class,
           ]);
       });
   ```

### Step 3: Server-Side Installation Complete

At this point, the server-side setup for Inertia.js is complete.

### Step 4: Client-Side Installation

1. **Install Inertia.js for React**

   Run the following command in the terminal:

   ```bash
   npm install @inertiajs/react
   ```

2. **Create `app.js` in `Resources/Js`**

   Create a new file at `resources/js/app.js` and add the following code:

   ```javascript
   import { createInertiaApp } from '@inertiajs/react';
   import { createRoot } from 'react-dom/client';

   createInertiaApp({
     resolve: name => {
       const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
       return pages[`./Pages/${name}.jsx`];
     },
     setup({ el, App, props }) {
       createRoot(el).render(<App {...props} />);
     },
   });
   ```

### Step 5: Create a Sample Page

1. Create a file in `resources/js/Pages` named `Sample.jsx`:

   ```javascript
   import React from 'react';

   function Sample() {
     return (
       <div>
         <h1>Hello, World!</h1>
       </div>
     );
   }

   export default Sample;
   ```

### Step 6: Install API

1. **Install the API**

   Run the following command to create the `api.php` routes file:

   ```bash
   php artisan make:controller UserController --api
   ```

   This command creates a new controller in `app/Http/Controllers`.

2. **Define API Routes**

   Open `routes/api.php` and define your API routes.

### Step 7: Handle JSX Extension Errors

If you encounter errors regarding the JSX extension, perform the following:

1. Rename `resources/js/app.js` to `app.jsx`.
2. Update any references to `app.js` in `vite.config.js` to `app.jsx`.
3. Also, rename `resources/views/app.blade.php` if necessary.

### Step 8: Create a Database Table

1. **Create a Model with Migration**

   Run the following command to create a model and its corresponding migration file:

   ```bash
   php artisan make:model ModelName --migration
   ```

2. **Define Columns in Migration**

   Open the generated migration file in the `database/migrations` folder and define the required columns.

3. **Run the Migrations**

   Run the following command to create all tables:

   ```bash
   php artisan migrate
   ```

### Step 9: Define Model

In your model (e.g., `ModelName.php`), define the protected properties for the table name and primary key:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelName extends Model
{
    use HasFactory;

    protected $table = 'your_table_name';
    protected $primaryKey = 'your_primary_key';
}
```

### Step 10: Set Up Axios

1. **Install Axios**

   Run the following command to install Axios:

   ```bash
   npm install axios
   ```

2. **Using Axios**

   Use Axios in your components to fetch data from your backend. For example, in a React component, use the `useEffect` hook:

   ```javascript
   import React, { useEffect, useState } from 'react';
   import axios from 'axios';

   function Sample() {
     const [data, setData] = useState([]);

     useEffect(() => {
       axios.get('/api/your-endpoint')
         .then(response => {
           setData(response.data);
         })
         .catch(error => {
           console.error("There was an error fetching the data!", error);
         });
     }, []);

     return (
       <div>
         <h1>Hello, World!</h1>
         {/* Render your data here */}
       </div>
     );
   }

   export default Sample;
   ```

### Summary

With these steps, you have successfully set up a Laravel project with Inertia.js and Axios. You can now create additional components and API endpoints as needed for your application.