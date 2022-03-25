import 'package:flutter/material.dart';
import 'package:mobile_app/components/accordion.dart';
import 'package:mobile_app/screens/ConnexionPage.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '🤝 Reunionou',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: '🤝 Reunionou'),
    );
  }
}

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
        title: Text('🤝 Reunionou'),
        backgroundColor: Colors.grey,
      ),

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const <Widget>[
            Text(
              'Les Amis sont ceux qui font la vie. ',
              style: TextStyle(fontSize: 40),
              textAlign: TextAlign.center,
            ),
            Text(
              "Reunionou est la plateforme que permets de gérer vos rencontres. Plus qu'une simple plateforme de gestion de rendez-vous, c'est un planner qui vous fera gagner du temps. ",
              style: TextStyle(fontSize: 25),
              textAlign: TextAlign.center,
            ),
            Accordion(
              title: "Est-ce que Reunionou est gratuit ?",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum, mi vitae vulputate sodales, sem sem consectetur lorem, vitae lacinia libero massa eget nibh. ",
            ),
            Accordion(
              title: "Comment je peux créer un événement ?",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum, mi vitae vulputate sodales, sem sem consectetur lorem, vitae lacinia libero massa eget nibh. ",
            ),
            Accordion(
              title: "Je dois obligatoirement créer un compte ?",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum, mi vitae vulputate sodales, sem sem consectetur lorem, vitae lacinia libero massa eget nibh. ",
            ),
          ],
        ),
      ),

      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const SizedBox(
              height: 100.0,
              child: DrawerHeader(
                child: Text('🤝 Reunionou', style: TextStyle(color: Colors.white,fontSize: 50)),
                decoration: BoxDecoration(color: Colors.grey),
                margin: EdgeInsets.all(0.0),
                padding: EdgeInsets.all(0.0),
              ),
            ),
            ListTile(
              title: const Text('Me connecter',style: TextStyle(fontSize: 20)),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ConnexionPage()),
                );
              },
            ),
            ListTile(
              title: const Text('Mon compte',style: TextStyle(fontSize: 20)),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Mes rendez-vous',style: TextStyle(fontSize: 20)),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Déconnexion',style: TextStyle(fontSize: 20)),
              onTap: () {
                Navigator.pop(context);
              },
            ),],
        ),
      ),// This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}