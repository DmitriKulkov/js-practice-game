const board = document.querySelector('#board')
const remove = document.querySelector('.reset')
const colors = ['#EA047E', '#FF6D28', '#FCE700', '#00F5FF', '#D800A6']
const BOARD_WIDTH = 25

remove.addEventListener('click', removeColors)

for (let i = 0; i < BOARD_WIDTH; i++){
  for (let j = 0; j < BOARD_WIDTH; j++){
    const square = document.createElement('div')
    square.setAttribute('id', `i_${i}_${j}`)
    square.classList.add('square')
    square.addEventListener('mouseover', ()=>setColor(square))
    board.append(square)
  }
}

function setColor(element){
  const color = getRandomColor()
  const nearElements = getNearElements(element.id)
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
  nearElements.forEach((element)=>{
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
  })
}

function removeColors(){
  const squares = document.querySelectorAll('.square')
  squares.forEach((element)=>{
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
  })
}

function getRandomColor(){
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

function getNearElements(id){
  const i_j = id.split('_')
  const nearElements = document.querySelectorAll(
    ((parseInt(i_j[1]) > 0? '#i_' + (parseInt(i_j[1])-1) + '_'+ i_j[2] + ',':'')+
    (parseInt(i_j[2]) > 0? '#i_' + i_j[1] + '_' + (parseInt(i_j[2])-1) + ',':'')+
    (parseInt(i_j[1]) < BOARD_WIDTH-1? '#i_' + (parseInt(i_j[1])+1) + '_'+ i_j[2] + ',':'')+
    (parseInt(i_j[2]) < BOARD_WIDTH-1? '#i_' + i_j[1] + '_' + (parseInt(i_j[2])+1) + ',':'')).slice(0, -1)
    )
  return nearElements 
}