let players = {};
let audio_files = ["借金①", "借金②", "借金③", "大破産", "レジスター", "爆発"];
let sounds = {};

for (n in audio_files){
  let filename = audio_files[n];
  sounds[filename] = new Audio("audio/" + filename + ".mp3");
  document.getElementById("audio").innerHTML += "<option value=\"" + filename + "\">" + filename + "</option>";
}

function add_player(){
  let element = document.getElementById("player_name");

  if (element.value == "" || element.value in players){
    element.value = "";
    return;
  };

  let other_players = players;
  players[element.value] = {};

  for (player in other_players){
    players[element.value][player] = 0;
    players[player][element.value] = 0;
  };

  element.value = "";
  update_display();
};

function update_display(){
  let element = document.getElementById("display");
  let text = "";

  for (player in players){
    let li_text = "";
    for (other_player in players[player]){
      if (other_player == player) continue;
      li_text += "<div class=\"pure-u-1-2 pure-u-sm-1-4 pure-u-md-1-6 pure-u-lg-1-8 pure-u-xl-1-10\">" +
                 other_player + ": <b>" + players[player][other_player] + "円</b><br>" +
                 "<input class=\"pure-button\" type=\"button\" value=\"＋\" onclick=\"plus('" + player + "', '" + other_player + "')\"> " +
                 "<input class=\"pure-button\" type=\"button\" value=\"ー\" onclick=\"minus('" + player + "', '" + other_player + "')\">" +
                 "</div>";
    };
    text += "<h2>" + player + "</h2>" +
            "<div class=\"pure-g\">" + li_text + "</div>";
  };

  element.innerHTML = text;
};

function enter(e){
  if (e.keyCode === 13) add_player();
};

function plus(player, opponent){
  play_se();
  players[player][opponent] += 500;
  players[opponent][player] -= 500;
  update_display();
};

function minus(player, opponent){
  play_se();
  players[player][opponent] -= 500;
  players[opponent][player] += 500;
  update_display();
};

function play_se(){
  let element = document.getElementById("audio");
  let se = sounds[element.value];
  se.currentTime = 0;
  se.play();
};

document.getElementById("player_name").addEventListener("keypress", enter);
