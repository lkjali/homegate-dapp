pragma solidity ^0.4.18;

contract Mietvertrag {

  struct Mietgegenstand {
    uint liegenschaftsnr;
    uint objektnummer;
    string adresse;
  }

  struct Miete {
    uint nettomiete;
    uint nebenkosten;
    uint mietkaution;
  }

  struct Konditionen {
    string kuendigungsfrist;
    bool haustiereErlaubt;
  }

  address public vermieter;
  address public mieter;
  Mietgegenstand public mietgegenstand;
  Miete public miete;
  Konditionen public konditionen;
  string public mietbeginn;
  uint public schlussbetrag;

  address[] public aufgenommeneInteressenten;
  address[] public angenommeneInteressenten;

  enum Status { ausgeschrieben, selektiert, vermietet, in_pruefung, in_abschluss, gekuendigt }
  Status public status;

  // -----------------------------------------------------------------------------------------------------
  // Events
  event MieterSelektiert(address _address);
  event KuendigungAkzeptieren(uint betrag);
  event KuendigungAblehnen(string begruendung);
  event Vertagbeendet();

  // -----------------------------------------------------------------------------------------------------
  // Konstruktur
  function Mietvertrag() public {
    vermieter = msg.sender;
    mietgegenstand = Mietgegenstand(123, 1, "8952 Schlieren");
    miete = Miete(1500, 120, 10);
    konditionen = Konditionen("3 Monate", true);
    mietbeginn = "01.10.2018";
    status = Status.ausgeschrieben;
  }

  // -----------------------------------------------------------------------------------------------------
  // Modifiers
  modifier nurVermieter {
    require(msg.sender == vermieter);
    _;
  }

  modifier nurMieter {
    require(msg.sender == mieter);
    _;
  }

  modifier inStatus(Status _status) {
    require(status == _status);
    _;
  }

  modifier bedingung(bool _bedingung) {
    require(_bedingung);
    _;
  }

  // -----------------------------------------------------------------------------------------------------
  // Contract Funktionen
  function interesseBekundigen() public {
    aufgenommeneInteressenten.push(msg.sender);
    if(hatKeineBetreibungen()) {
      angenommeneInteressenten.push(msg.sender);
    }
  }

  function mieterSelektieren(address _address) nurVermieter inStatus(Status.ausgeschrieben) public {
    mieter = _address;
    status = Status.selektiert;
    MieterSelektiert(_address);
  }

  function vertragUnterschreiben() nurMieter inStatus(Status.selektiert)
  bedingung(msg.value == miete.mietkaution) payable public {

    status = Status.vermietet;
  }

  function vertragKuendigen() nurMieter inStatus(Status.vermietet) public {
    status = Status.in_pruefung;
  }

  function kuendigungAblehnen(string begruendung) nurVermieter inStatus(Status.in_pruefung) public {
    status = Status.vermietet;
    KuendigungAblehnen(begruendung);
  }

  function mietobjektKontrolliert(uint betrag) nurVermieter inStatus(Status.in_pruefung) public {
    status = Status.in_abschluss;
    schlussbetrag = betrag;
    KuendigungAkzeptieren(betrag);
  }

  function schlussbetragUeberweisen() nurMieter inStatus(Status.in_abschluss)
  bedingung(msg.value == schlussbetrag) payable public {

    mieter.transfer(miete.mietkaution);
    vermieter.transfer(schlussbetrag);
    status = Status.gekuendigt;
    Vertagbeendet();
  }

  // Mock-Aufruf zum Betriebungsamt
  function hatKeineBetreibungen() private constant returns(bool) {
    return aufgenommeneInteressenten.length % 2 == 1;
  }

  // -----------------------------------------------------------------------------------------------------
  //Utility Methode für Client
  function getAngenommenAddressen() public constant returns (address[]) {
    return angenommeneInteressenten;
  }

  function getContractStatus() public constant returns (Status) {
    return status;
  }

  //Utility Methode für Client -- evtl. auch löschen
  function getAufgenommenAddressCount() public constant returns(uint count) {
    return aufgenommeneInteressenten.length;
  }

  function getAngenommenAddressCount() public constant returns(uint count) {
    return angenommeneInteressenten.length;
  }

}
