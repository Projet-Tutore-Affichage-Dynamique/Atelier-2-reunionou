import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/connexion.dart';
import 'package:mobile_app/main.dart';
import 'package:mobile_app/models/events.dart';

class ConnexionPage extends StatefulWidget {
  const ConnexionPage({Key? key}) : super(key: key);

  @override
  State<ConnexionPage> createState() => _ConnexionPageState();
}

var id = "";
var mdp = "";
var tokenauth;
var events = [];

class _ConnexionPageState extends State<ConnexionPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Connexion'),
      ),
      body: Center(
        child: Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
          child:  Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Connexion',
                style: TextStyle(fontSize: 40),
                textAlign: TextAlign.center,
              ),
              const Text(
                'Renseignez votre identifiant et votre mot de passe pour vous connecter.',
                style: TextStyle(fontSize: 20, fontStyle: FontStyle.italic),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                width: 300,
                child: TextField(
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Identifiant ou E-mail',
                  ),
                  onChanged: (value) {
                    id = value;
                  },
                ),
              ),

              SizedBox(
                width: 300,
                child: TextField(
                  obscureText: true,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Mot de passe',
                  ),
                  onChanged: (value) {
                    mdp = value;
                  },
                ),
              ),
              ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                ),
                onPressed: () {
                  Navigator.pop(context);
                  setState(() {
                    postConnexion();
                  });
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const MyApp()),
                  );
                },
                child: const Text('Connexion'),
              ),
            ],
          ),
        ),

      ),
    );
  }
}


Future<Connexion> postConnexion() async{
  final response = await http.post(
      Uri.parse('http://docketu.iutnc.univ-lorraine.fr:62441/auth/signin'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Basic '+ base64Encode(utf8.encode('$id:$mdp'))
      },
  );

  if (response.statusCode == 200) {
    var res = Connexion.fromJson(jsonDecode(response.body));
    tokenauth = res.token;
    return res;
  } else {
    throw Exception('Failed to get token');
  }
}

checkConnection() {
  if (tokenauth != null){
    return true;
  }else {
    return false;
  }
}

getUserCredentials() {
  if (checkConnection()){
    return {id,mdp};
  }
}

Future<Events> getUserEvents() async{
  final response = await http.get(
    Uri.parse('http://docketu.iutnc.univ-lorraine.fr:62441/events'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': "*/*",
      'connection': 'keep-alive',
      'Accept-Encoding' : 'gzip, deflate, br',
      'authorization': 'Bearer $tokenauth'
    },
  );

  if (response.statusCode == 200) {
    var res = Events.fromJson(jsonDecode(response.body));
    events = res.events;
    return res;
  } else {
    throw Exception('Failed to get events');
  }
}

disconnectUser() {
  if (checkConnection()){
    tokenauth = "";
  }
}