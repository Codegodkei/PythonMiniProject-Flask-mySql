from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configure MySQL connection
mysql_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Abdeali7",
    database="Contact"
)

# Create MySQL cursor
cursor = mysql_connection.cursor(dictionary=True)

# GET operation
@app.route("/contacts", methods=["GET"])
def get_contacts():
    cursor.execute("SELECT * FROM contacts")
    contacts = cursor.fetchall()
    return jsonify({"contacts": contacts})

# POST operation
@app.route("/create_contact", methods=["POST"])
def create_contact():
    data = request.json
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    sql = "INSERT INTO contacts (first_name, last_name, email) VALUES (%s, %s, %s)"
    values = (first_name, last_name, email)
    cursor.execute(sql, values)
    mysql_connection.commit()
    return jsonify({"message": "User Created!"}), 201

# PATCH operation
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    data = request.json
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    sql = "UPDATE contacts SET first_name=%s, last_name=%s, email=%s WHERE id=%s"
    values = (first_name, last_name, email, user_id)
    cursor.execute(sql, values)
    mysql_connection.commit()
    return jsonify({"message": "User updated"}), 200

# DELETE operation
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    sql = "DELETE FROM contacts WHERE id=%s"
    cursor.execute(sql, (user_id,))
    mysql_connection.commit()
    return jsonify({"message": "User deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)
