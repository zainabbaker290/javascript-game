from flask import Flask, render_template, redirect, url_for, request, jsonify, g, session
from database import get_db, close_db
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LeaderboardForm, RegistrationForm, LoginForm
from functools import wraps
from flask_session import Session


app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-my-secret-key"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.before_request
def load_logged_in_user():
    g.user = session.get("user_name", None)

def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return(redirect(url_for("login", next=request.url)))
        return view(**kwargs)
    return wrapped_view

#home
@app.route("/")
def home():
    return render_template("home.html")

#to register
@app.route("/register", methods=["GET","POST"])
def register():
    form = RegistrationForm()

    if form.validate_on_submit():

        user_name = form.user_name.data
        password = form.password.data
        db = get_db()

        #if the username already exists 
        if db.execute("""SELECT * FROM users
                        WHERE user_name = ?;""", (user_name,)).fetchone() is not None:
            form.user_name.errors.append("User name already taken! Please use another")

        #if all is good, you should be registered 
        else:
            db.execute('''INSERT INTO users (user_name,password)
                                VALUES (?,?);''',(user_name,generate_password_hash(password)))
            db.commit()
            return redirect(url_for("login"))
    return render_template("register.html", form=form)

#to login
@app.route("/login", methods=["GET","POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user_name = form.user_name.data
        password = form.password.data
        db = get_db()
        user = db.execute('''SELECT * FROM users
                            WHERE user_name = ?;''',(user_name,)).fetchone()
        if user is None:
            form.user_name.errors.append("Incorrect credentials!") #dont want to give away anything in database

        #if its the wrong password 
        elif not check_password_hash(user["password"],password):
            form.password.errors.append("Incorrect credentials!") #dont want to give away anything in database
        else:
            session["user_name"] = user_name
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("home")
            return redirect(next_page)

    return render_template("login.html", form=form)

#to logout
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))

#the game
@app.route("/game",methods = ["GET", "POST"])
@login_required
def game():
    return render_template("game.html")

#the leaderboard shows the score by highest to lowest
@app.route("/leaderboard", methods = ["POST", "GET"])
def leaderboard():
    db = get_db()
    leaderboard = db.execute("""SELECT * FROM leaderboard ORDER BY score DESC;""").fetchall()
    return render_template("leaderboard.html", leaderboard=leaderboard)


@app.route("/store_score", methods = ["POST"])
def store_score():
    #try to insert the score, if it fails, return an error
    try:
        score = int(request.form["score"])
    except:
        return("sorry, and error has occured", url_for("home"))
    user_name = session["user_name"]
    db = get_db()

    #checking if there is a previous score
    previous_score = db.execute("""SELECT score
                                    FROM leaderboard
                                    WHERE user_name =?;""",(user_name,)).fetchone()
    

    #if there is a previous score and its smaller than the new score, update it 
    if previous_score and previous_score[0] < score:
        db.execute("""UPDATE leaderboard
                        SET score = ?
                        WHERE user_name = ?;""",(score,user_name)).fetchone()
        db.commit()
    #if the previous score is bigger than the new score, keep the previous score
    elif previous_score and previous_score[0] >  score:
        score = previous_score[0]

    #if there is no previous score
    else:
        db.execute("""INSERT INTO leaderboard (user_name,score)
                        VALUES(?,?);""", (user_name,score))
        db.commit()
    return "success"


