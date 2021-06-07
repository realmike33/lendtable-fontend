import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Input, Icon, Confirm } from 'semantic-ui-react'
import Banner from '../../components/banner'
import { getCharacter, updateCharacter, deleteCharacter } from '../../utils/api'
import { getToken } from '../../utils/localstorage'
const Character = () => {
  const router = useRouter()
  const [character, setCharacter] = useState({})
  const [isOpen, setConfirmModal] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/')
    }
    const charId = router.query.id
    if (!character._id && charId) {
      ;(async () => {
        const data = await getCharacter(charId)
        if (!data) {
          router.push('/')
          return
        }
        setCharacter(data)
      })()
    }
  }, [router.query.id])

  const handleStateChage = (stat, value) => {
    let realValue = value
    if (value > 20) {
      realValue = 20
    } else if (value < 0) {
      realValue = 0
    }
    setCharacter((preState) => {
      const result = preState
      preState[stat] = realValue
      return result
    })
  }

  const handleUpdate = async () => {
    const data = {
      name: character.name,
      stats: {
        str: character.str,
        dex: character.dex,
        con: character.con,
        int: character.int,
        wis: character.wis,
        cha: character.cha,
      },
    }
    const error = await updateCharacter(router.query.id, data)
    if (!error) {
      router.push('/')
      return
    }
  }

  const handleDelete = async () => {
    const error = await deleteCharacter(router.query.id)
    setConfirmModal(false)
    if (!error) {
      router.push('/')
      return
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '800px',
        margin: '0 auto',
        justifyContent: 'space-evenly',
        minHeight: '800px',
      }}
    >
      <Banner />
      <div>
        <p>Name</p>
        <Input
          defaultValue={character.name}
          onChange={(e) =>
            setCharacter((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <h3>Stats</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p>Strength (STR)</p>
            <Input defaultValue={character.str} onChange={(e) => handleStateChage('str', e.target.value)} type="number" min="0" max="20" />
          </div>
          <div>
            <p>Dexterity (DEX)</p>
            <Input defaultValue={character.dex} onChange={(e) => handleStateChage('dex', e.target.value)} type="number" min="0" max="20" />
          </div>
          <div>
            <p>Constitution (CON)</p>
            <Input defaultValue={character.con} onChange={(e) => handleStateChage('con', e.target.value)} type="number" min="0" max="20" />
          </div>
          <div>
            <p>Intelligence (INT)</p>
            <Input defaultValue={character.int} onChange={(e) => handleStateChage('int', e.target.value)} type="number" min="0" max="20" />
          </div>
          <div>
            <p>Wisdom (WIS)</p>
            <Input defaultValue={character.wis} onChange={(e) => handleStateChage('wis', e.target.value)} type="number" min="0" max="20" />
          </div>
          <div>
            <p>Charisma (CHA)</p>
            <Input defaultValue={character.cha} onChange={(e) => handleStateChage('cha', e.target.value)} type="number" min="0" max="20" />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Button basic color="blue" onClick={() => router.push('/')}>
          Go Back
        </Button>
        <Button basic color="green" onClick={handleUpdate}>
          <Icon name="save outline" />
          Save
        </Button>
        <Button color="red" onClick={() => setConfirmModal(true)}>
          <Icon name="trash alternate outline" />
          Delete
        </Button>
      </div>
      <Confirm content="Are you sure you want to delete this character?" open={isOpen} onCancel={() => setConfirmModal(false)} onConfirm={handleDelete} />
    </div>
  )
}

export default Character
