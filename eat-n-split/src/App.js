import { useState } from 'react'

const randomFriends = [
  {
    id: 1,
    name: 'Stan',
    img: 'https://i.pravatar.cc/48?u=118836',
    balance: 10
  },
  {
    id: 2,
    name: 'Kate',
    img: 'https://i.pravatar.cc/48?u=118834',
    balance: 0
  },
  {
    id: 3,
    name: 'Pablo',
    img: 'https://i.pravatar.cc/48?u=118832',
    balance: -1
  }
]

function Button ({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  )
}

export default function App () {
  const [IsOpen, setIsOpen] = useState(false)
  const [friends, setFriends] = useState(randomFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function showFriends () {
    setIsOpen(show => !show)
  }

  function addRandomFriend (newFriend) {
    setFriends(friends => [...friends, newFriend])
    setIsOpen(false)
  }

  function handleSelect (friend) {
    setSelectedFriend(friend)
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} onHandleSelect={handleSelect} />
        {IsOpen && <FormAddFriend onAddFriend={addRandomFriend} />}
        <Button onClick={showFriends}>{IsOpen ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  )
}

function FriendList ({ friends, onHandleSelect }) {
  return (
    <ul>
      {friends.map(friend => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onHandleSelect={onHandleSelect}
          />
        )
      })}
    </ul>
  )
}

function Friend ({ friend, onHandleSelect }) {
  return (
    <li>
      <img src={friend.img} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance < 0 ? 'red' : friend.balance > 0 ? 'green' : ''
        }
      >
        {friend.balance < 0
          ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
          : friend.balance === 0
          ? `You and ${friend.name} are even`
          : `${friend.name} owes you ${friend.balance}$`}
      </p>
      <Button onClick={() => onHandleSelect(friend)}>Select</Button>
    </li>
  )
}

function FormAddFriend ({ onAddFriend }) {
  const [name, setName] = useState('')
  const rndImage = Math.floor(Math.random() * 933372)
  function handleSubmit (e) {
    e.preventDefault()

    const newFriend = {
      id: new Date().getTime(),
      name,
      img: `https://i.pravatar.cc/48?u=${rndImage}`,
      balance: 0
    }
    onAddFriend(newFriend)
    setName('')
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill ({ selectedFriend }) {
  return (
    <form className='form-split-bill'>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input type='text' />
      <label>👲Your Expenses</label>
      <input type='text' />
      <label>🧑‍🤝‍🧑{selectedFriend.name} Expenses</label>
      <input type='text' disabled />
      <label>😃Who is paying the bill?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}
