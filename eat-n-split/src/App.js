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

  function showFriends () {
    setIsOpen(show => !show)
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList />
        {IsOpen && <FormAddFriend />}
        <Button onClick={showFriends}>{IsOpen ? 'Close' : 'Add Friend'}</Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

function FriendList () {
  const friendList = randomFriends
  return (
    <ul>
      {friendList.map(friend => {
        return <Friend friend={friend} key={friend.id} />
      })}
    </ul>
  )
}

function Friend ({ friend }) {
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
      <Button>Select</Button>
    </li>
  )
}

function FormAddFriend () {
  return (
    <form className='form-add-friend'>
      <label>Friend Name</label>
      <input type='text' />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill () {
  return (
    <form className='form-split-bill'>
      <h2>Split the bill with X</h2>

      <label>💰Bill Value</label>
      <input type='text' />
      <label>👲Your Expenses</label>
      <input type='text' />
      <label>🧑‍🤝‍🧑Friend Expenses</label>
      <input type='text' disabled />
      <label>😃Who is paying the bill?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>Friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}
