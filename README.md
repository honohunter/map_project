# Map Project

_This project is made base on the test that described here
[link](https://docs.google.com/document/d/1LulF_IS3GU0vPo_mileXiJ6bLL-4dW3yxBDtIbhuLM4/edit?fbclid=IwAR1C8s7TDQxHBI4dIm9ZFXXfXwAhtgv0DMLS6O42rQURUCcS9ffHuGJV5ng)_

This web application allow users to register their favorite locations and display them on map

## Backend

For the backend i used flask as restful api protected by JWT authentication, alongside with SqlAlchemy with SqlLite database

## Frontend

For the frontend i used React with webpack as assets manager

## Installing Requirements

```
cd flask_app
```

```
pip install -r flask_app/requirements.txt
```

```
export FLASK_APP=run.py
```

```
flask db init
```

```
flask db migrate
```

```
flask db upgrade
```

```
cd react_app
```

```
npm install
```

## Running

### option 1 : fullstack application

```
cd flask_app
```

```
flask run
```

open in your browser [text](http://localhost:5000/)
