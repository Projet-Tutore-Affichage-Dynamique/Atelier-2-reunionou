import 'package:flutter/material.dart';
import 'package:mobile_app/data/AllData.dart';
import 'package:provider/provider.dart';

class ConnexionPage extends StatefulWidget {
  const ConnexionPage({Key? key}) : super(key: key);

  @override
  State<ConnexionPage> createState() => _ConnexionPageState();
}



class _ConnexionPageState extends State<ConnexionPage>{

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Connexion'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
          child:  Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                child: Text(
                  'Connexion',
                  style: TextStyle(fontSize: 40),
                  textAlign: TextAlign.center,
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                child: Text(
                  'Renseignez votre identifiant et votre mot de passe pour vous connecter.',
                  style: TextStyle(fontSize: 20, fontStyle: FontStyle.italic),
                  textAlign: TextAlign.center,
                ),
              ),
              Consumer<All_Data>(builder: (context, data, child) {
                return Padding(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
                  child: SizedBox(
                    width: 300,
                    child: TextField(
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Identifiant ou E-mail',
                      ),
                      onChanged: (value) {
                        setState(() {
                          data.setDataId(value);
                        });
                      },
                    ),
                  ),
                );
              }),
              Consumer<All_Data>(builder: (context, data, child) {
                return Padding(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
                  child: SizedBox(
                    width: 300,
                    child: TextField(
                      obscureText: true,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Mot de passe',
                      ),
                      onChanged: (value) {
                        setState(() {
                          data.setDataMdp(value);
                        });
                      },
                    ),
                  ),
                );
              }),
              Consumer<All_Data>(builder: (context, data, child) {
                return Padding(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
                  child: ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                    ),
                    onPressed: () {
                      setState(() {
                        data.postConnexion(data.getDataId(),data.getDataMdp());
                      });
                      Navigator.pop(context);
                      },
                    child: const Text('Connexion'),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}