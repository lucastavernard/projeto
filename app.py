from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simulando um banco de dados com uma lista simples
denuncias = []

@app.route('/')
def home():
    # Enviar as denúncias já feitas para o template
    return render_template('index.html', denuncias=denuncias)

@app.route('/denuncia', methods=['POST'])
def denuncia():
    try:
        data = request.get_json()
        if not data or 'nome' not in data or 'tipoDenuncia' not in data or 'localizacao' not in data:
            return jsonify({"status": "error", "message": "Dados incompletos"}), 400
        denuncias.append(data)  # Adicionando a denúncia à "base de dados"
        return jsonify({"status": "success", "message": "Denúncia recebida!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
