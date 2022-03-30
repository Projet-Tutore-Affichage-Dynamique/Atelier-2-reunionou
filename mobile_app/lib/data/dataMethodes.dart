import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/connexion.dart';
import 'package:mobile_app/models/events.dart';
import 'package:mobile_app/models/eventDetail.dart';

var dataId = "";
var dataMdp = "";
var dataTokenAuth;
var dataEventList;
var dataEventDetails = [];

class DataMethodes {
  
  Future<Connexion> postConnexion() async{
    final response = await http.post(
      Uri.parse('http://192.168.42.99:8082/auth/signin'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Basic '+ base64Encode(utf8.encode('$dataId:$dataMdp'))
      },
    );

    if (response.statusCode == 200) {
      var res = Connexion.fromJson(jsonDecode(response.body));
      dataTokenAuth = res.token;
      return res;
    } else {
      throw Exception('Failed to get token');
    }
  }

  checkConnection() {
    if (dataTokenAuth != null){
      return true;
    }else {
      return false;
    }
  }

  getUserCredentials() {
    if (checkConnection()){
      return {dataId,dataMdp};
    }
  }

  Future<Events> getUserEvents() async{
    final response = await http.get(
      Uri.parse('http://192.168.42.99:8082/events'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Bearer $dataTokenAuth'
      },
    );

    if (response.statusCode == 200) {
      var res = Events.fromJson(jsonDecode(response.body));
      dataEventList = res.events;
      return res;
    } else {
      throw Exception('Failed to get events');
    }
  }

  Future<EventDetail> getEventDetails(id) async{
    final response = await http.post(
      Uri.parse('http://192.168.42.99:8082/events/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Bearer '+ dataTokenAuth,
      },
    );

    if (response.statusCode == 200) {
      var res = EventDetail.fromJson(jsonDecode(response.body));
      dataEventDetails = res.eventDetail;
      return res;
    } else {
      throw Exception('Failed to get event details');
    }
  }

  Future<EventDetail> createEvent(titre,description,date,heure,lieu) async{
    final response = await http.post(
      Uri.parse('http://192.168.42.99:8082/events/create'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Bearer '+ dataTokenAuth,
      },
      body: <String, String>{
        'titre': titre,
        'description': description,
        'date': date,
        'heure': heure,
        'lieu': lieu
      }
    );

    if (response.statusCode == 200) {
      var res = EventDetail.fromJson(jsonDecode(response.body));
      dataEventDetails = res.eventDetail;
      return res;
    } else {
      throw Exception('Failed to create new event');
    }
  }

  disconnectUser() {
    if (checkConnection()){
      dataTokenAuth = "";
    }
  }
}