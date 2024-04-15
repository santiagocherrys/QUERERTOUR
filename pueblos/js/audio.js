

export let estadoBoton = [false,false,false,false,false,false] // 0-> false 1-> true

export function playAudio(sonido, estado){
    if(estado == false){
      switch(sonido){
        case "1":
          audios.children[0].play();
          break;
        case "2":
          audios.children[1].play();
          break;
        case "3":
          audios.children[2].play();
          break;
        case "4":
          audios.children[3].play();
          break;
        case "5":
          audios.children[4].play();
          break;
        case "6":
          audios.children[5].play();
          break;
      }
    }else{
      switch(sonido){
        case "1":
          audios.children[0].pause();
          break;
        case "2":
          audios.children[1].pause();
          break;
        case "3":
          audios.children[2].pause();
          break;
        case "4":
          audios.children[3].pause();
          break;
        case "5":
          audios.children[4].pause();
          break;
        case "6":
          audios.children[5].pause();
          break;
      }
    }
  }