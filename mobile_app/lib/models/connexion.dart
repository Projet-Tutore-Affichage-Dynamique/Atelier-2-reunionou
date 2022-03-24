class Connexion {
  final String token;

  const Connexion({
    required this.token,
  });

  factory Connexion.fromJson(Map<String, dynamic> json) {
    return Connexion(
        token: json['token']
    );
  }
}
