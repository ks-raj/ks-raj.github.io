import subprocess
import concurrent.futures
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Helper function to run subprocess commands and handle errors
def run_command(command):
    try:
        result = subprocess.check_output(command, shell=True, universal_newlines=True)
        return result
    except subprocess.CalledProcessError as e:
        return f"Error: {e.output.strip() if e.output else 'No additional output'}"
    except FileNotFoundError:
        return "Error: Command not found"

@app.route('/scan', methods=['POST'])
def scan():
    data = request.json
    case_id = data.get("caseId")
    investigator = data.get("investigator")
    phone = data.get("phone")
    email = data.get("email")

    results = {}

    # Define the commands to be run concurrently
    commands = {
        "Current User": ["whoami"],
        "System Details": ["systeminfo"],
        "User Accounts": ["net user"],
        "Logon Sessions": ["query session"],
        "User Profiles": ["wmic useraccount get name,sid"],
        "Administrator Accounts": ["net localgroup Administrators"],
        "Installed Programs": ["wmic product get name,version"],
        "Environment Variables": ["set"],
        "IP Configuration": ["ipconfig /all"],
        "Network Adapter Info": ["wmic nic get Name,Status,MACAddress"],
        "Active TCP Connections": ["netstat -ano"],
        "Processes": ["tasklist"],
        "Services": ["sc query"],
        "Registry Persistence": ["reg query HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"]
    }

    # Run commands concurrently
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_command = {executor.submit(run_command, cmd[0]): name for name, cmd in commands.items()}
        for future in concurrent.futures.as_completed(future_to_command):
            name = future_to_command[future]
            try:
                result = future.result()
                results[name] = result
            except Exception as e:
                results[name] = f"Error: {str(e)}"

    return jsonify({
        "caseId": case_id,
        "investigator": investigator,
        "results": results
    })

if __name__ == "__main__":
    app.run(debug=True)

