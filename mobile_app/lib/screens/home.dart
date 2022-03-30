import 'package:flutter/material.dart';
import 'package:mobile_app/screens/ConnexionPage.dart';
import 'package:mobile_app/screens/FAQPage.dart';
import 'package:mobile_app/screens/RendezVous.dart';
import 'package:provider/provider.dart';
import 'package:mobile_app/data/AllData.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🤝 Reunionou'),
        backgroundColor: Colors.blue,
      ),

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const <Widget>[
            Text(
              'Les Amis sont ceux qui font la vie',
              style: TextStyle(fontSize: 40),
              textAlign: TextAlign.center,
            ),
            Text(
              "Reunionou",
              style: TextStyle(fontSize: 25),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),

      drawer: Drawer(
        child:
        Consumer<All_Data>(builder: (context, data, child) {
          return ListView(
            padding: EdgeInsets.zero,
            children: [
              const SizedBox(
                height: 100.0,
                child: DrawerHeader(
                  child: Text('🤝 Reunionou', style: TextStyle(color: Colors.white,fontSize: 50)),
                  decoration: BoxDecoration(color: Colors.blue),
                  margin: EdgeInsets.all(0.0),
                  padding: EdgeInsets.all(0.0),
                ),
              ),
              if (data.getDataTokenAuth() != null) ... [
                ListTile(
                  title: const Text('Mon compte',style: TextStyle(fontSize: 20)),
                  onTap: () {
                  },
                ),
                ListTile(
                  title: const Text('Mes rendez-vous',style: TextStyle(fontSize: 20)),
                  onTap: () {
                    data.getUserEvents(data.getDataTokenAuth());
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const RendezVous()),
                    );
                  },
                ),
                ListTile(
                  title: const Text('Déconnexion',style: TextStyle(fontSize: 20)),
                  onTap: () {
                    data.disconnectUser();
                  },
                ),
              ] else ... [
                ListTile(
                  title: const Text('Connexion',style: TextStyle(fontSize: 20)),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const ConnexionPage()),
                    );
                  },
                ),
              ],
              ListTile(
                title: const Text('F.A.Q',style: TextStyle(fontSize: 20)),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const FAQPage()),
                  );
                },
              ),
            ],
          );
        }),

      ),// This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}