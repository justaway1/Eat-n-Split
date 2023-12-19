const randomFriends = [
  {
    id: 1,
    name: 'Stan',
    img: 'https://i.pravatar.cc/48?u=118836',
    balance: 10
  },
  { id: 2, name: 'Kate', img: 'https://i.pravatar.cc/48?u=118834', balance: 0 },
  {
    id: 3,
    name: 'Pablo',
    img: 'https://i.pravatar.cc/48?u=118832',
    balance: -1
  }
]

export default function App () {
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList />
      </div>
    </div>
  )
}

function FriendList () {}
