# Airbnb MVC Application

A full-stack web application built with Node.js, Express, and PostgreSQL following the Model-View-Controller (MVC) architecture pattern. This application simulates an Airbnb-like platform with home listings, contact forms, and user interactions.

## 🚀 Features

- **Home Listings**: Browse and add property listings
- **Contact System**: Contact form with database storage
- **File Upload**: Support for image uploads
- **Responsive Design**: Built with Tailwind CSS
- **MVC Architecture**: Clean separation of concerns
- **Database Integration**: PostgreSQL with connection pooling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **View Engine**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS
- **File Upload**: express-fileupload
- **Development**: Nodemon, Concurrently

## 📁 Project Structure

```
airbnb-mvc/
├── app.js                 # Main application file
├── db.js                  # Database connection setup
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── controllers/           # Business logic
│   ├── 404.js
│   ├── contacts.js
│   └── homes.js
├── routes/                # Route definitions
│   ├── contactRouter.js
│   ├── hostRouter.js
│   └── userRouter.js
├── views/                 # EJS templates
│   ├── 404.ejs
│   ├── addHome.ejs
│   ├── contact.ejs
│   ├── home.ejs
│   ├── homeForm.ejs
│   ├── thankYouHome.ejs
│   └── partials/
│       ├── footer.ejs
│       ├── head.ejs
│       └── header.ejs
├── public/                # Static files
│   ├── css/
│   │   ├── input.css
│   │   └── style.css
│   └── photo/
└── utils/                 # Utility functions
    └── pathUtils.js
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airbnb-mvc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a PostgreSQL database
   - Create a `.env` file in the root directory with your database credentials:
   ```env
   PGUSER=your_db_user
   PGHOST=localhost
   PGDATABASE=your_db_name
   PGPASSWORD=your_db_password
   PGPORT=5432
   ```

4. **Create required database tables**
   ```sql
   -- Create contacts table
   CREATE TABLE contacts (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Add other tables as needed for homes/listings
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This command runs both the Tailwind CSS build process and the Node.js server with nodemon for auto-restart.

### Production Mode
```bash
npm start
```

### Build CSS Only
```bash
npm run build:css
```

## 📋 Available Routes

### User Routes (`/user`)
- Home page with listings

### Host Routes (`/host`)
- Add new property listings
- Manage existing listings

### Contact Routes (`/contact-us`)
- `GET /contact-us` - Display contact form
- `POST /contact-us` - Submit contact form

## 🎨 Styling

This project uses Tailwind CSS for styling. The CSS is built from `public/css/input.css` to `public/css/style.css`.

To customize styles:
1. Edit `public/css/input.css`
2. Run `npm run build:css` to compile

## 📊 Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PGUSER=your_database_user
PGHOST=localhost
PGDATABASE=your_database_name
PGPASSWORD=your_database_password
PGPORT=5432
```

### Server Configuration
- **Port**: 3000 (default)
- **View Engine**: EJS
- **Static Files**: Served from `public/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Neetesh Vishwakarma**

## 🐛 Known Issues

- Add any known issues or limitations here

## 🔮 Future Enhancements

- User authentication system
- Advanced search and filtering
- Payment integration
- Review and rating system
- Email notifications
- API endpoints for mobile app integration

## 📞 Support

For support, please contact [your-email@example.com](mailto:your-email@example.com) or create an issue in the repository.

---

**Happy Coding! 🎉**
