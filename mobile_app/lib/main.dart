import 'package:flutter/material.dart';
import 'package:mobile_app/components/accordion.dart';

void main() {
  runApp(const MaterialApp(
    title: 'Reunionou',
    home: FirstRoute(),
  ));
}

class FirstRoute extends StatelessWidget {
  const FirstRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text('🤝 Reunionou'),
        backgroundColor: Colors.grey,
      ),

      body: Center(

        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
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
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
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
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Créer un compte',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Mon compte',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Mes rendez-vous',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Déconnexion',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),],
        ),
      ),// This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second Route'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: '🤝 Reunionou'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
        backgroundColor: Colors.grey,
      ),

      body: Center(

        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
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
      // Add a ListView to the drawer. This ensures the user can scroll
      // through the options in the drawer if there isn't enough vertical
      // space to fit everything.
        child: ListView(
        // Important: Remove any padding from the ListView.
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
              // Update the state of the app
              // ...
              // Then close the drawer
                  Navigator.pop(context);
                },
              ),
              ListTile(
                title: const Text('Créer un compte',style: TextStyle(fontSize: 20)),
                onTap: () {
              // Update the state of the app
              // ...
              // Then close the drawer
                Navigator.pop(context);
                },
              ),
            ListTile(
              title: const Text('Mon compte',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Mes rendez-vous',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Déconnexion',style: TextStyle(fontSize: 20)),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),],
          ),
        ),// This trailing comma makes auto-formatting nicer for build methods.
      );
  }
}
