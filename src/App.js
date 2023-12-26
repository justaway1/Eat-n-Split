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
    setSelectedFriend(curr => (curr?.id === friend.id ? null : friend))
    setIsOpen(false)
  }

  function handleBill (value) {
    setFriends(friends =>
      friends.map(friend =>
        selectedFriend.id === friend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList
          friends={friends}
          onHandleSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
        {IsOpen && <FormAddFriend onAddFriend={addRandomFriend} />}
        <Button onClick={showFriends}>{IsOpen ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onHandleBill={handleBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  )
}

function FriendList ({ friends, onHandleSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map(friend => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onHandleSelect={onHandleSelect}
            selectedFriend={selectedFriend}
          />
        )
      })}
    </ul>
  )
}

function Friend ({ friend, onHandleSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id
  return (
    <li className={isSelected ? 'selected' : ''}>
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
      <Button onClick={() => onHandleSelect(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function FormAddFriend ({ onAddFriend }) {
  const [name, setName] = useState('')
  const rndImage = Math.floor(Math.random() * 933372)
  function handleSubmit (e) {
    e.preventDefault()

    if (!name) return

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

function FormSplitBill ({ selectedFriend, onHandleBill }) {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const friendExpenses = bill ? bill - paidByUser : ''
  const [whoPaid, setWhoPaid] = useState('user')

  function handleSubmit (e) {
    e.preventDefault()
    if (!bill || !paidByUser) return

    onHandleBill(whoPaid === 'user' ? friendExpenses : -paidByUser)
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />
      <label>👲Your Expenses</label>
      <input
        type='text'
        value={paidByUser}
        onChange={e =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>🧑‍🤝‍🧑{selectedFriend.name} Expenses</label>
      <input type='text' disabled value={friendExpenses} />
      <label>😃Who is paying the bill?</label>
      <select value={whoPaid} onChange={e => setWhoPaid(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}
