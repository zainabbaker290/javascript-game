from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import InputRequired, EqualTo, Length

class LeaderboardForm(FlaskForm):
    name = StringField("Name:", validators=[InputRequired()])
    submit = SubmitField("Submit")

class RegistrationForm(FlaskForm):
    user_name = StringField("User Name:", validators=[InputRequired()])
    password = PasswordField("Password:", validators=[InputRequired(), Length(min=8, max=30, message="password format must be between 8-30 charcters")])
    password2 = PasswordField("Confirm Password:", validators=[InputRequired(), EqualTo("password")])
    submit = SubmitField("Submit")

class LoginForm(FlaskForm):
    user_name = StringField("User Name:", validators=[InputRequired()])
    password = PasswordField("password:", validators=[InputRequired()])
    submit = SubmitField("Submit")