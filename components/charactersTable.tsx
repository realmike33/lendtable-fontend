import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header, Image, Table, Button, Icon } from 'semantic-ui-react'
import { getAllCharacters, createCharacter } from '../utils/api'

function CharactersTable({ user }: { user: { id: string; userName: string } }) {
  const [characters, setAllCharaters] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!characters) {
      ;(async () => {
        const data = await getAllCharacters()
        setAllCharaters(data)
      })()
    }
  })

  const handleNewCharacter = async () => {
    // create dummy character for edit page
    try {
      const newChar = await createCharacter({
        name: 'New Character',
        stats: {
          str: 5,
          dex: 5,
          con: 5,
          int: 5,
          wis: 5,
          cha: 5,
        },
      })
      router.push({
        pathname: '/characters/[id]',
        query: { id: newChar._id },
      })
    } catch (e) {}
  }

  return (
    <Table celled singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2">Character</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Created By</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Actions</Table.HeaderCell>
          <Table.HeaderCell colSpan="6">Stats</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Strength (STR)</Table.HeaderCell>
          <Table.HeaderCell>Dexterity (DEX)</Table.HeaderCell>
          <Table.HeaderCell>Constitution (CON)</Table.HeaderCell>
          <Table.HeaderCell>Intelligence (INT)</Table.HeaderCell>
          <Table.HeaderCell>Wisdom (WIS)</Table.HeaderCell>
          <Table.HeaderCell>Charisma (CHA)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!!characters &&
          characters.map((_character: { _id: string; name: string; str: number; dex: number; con: number; int: number; wis: number; cha: number; createdBy: { _id: string; userName: string } }) => (
            <Table.Row key={_character._id}>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>{_character.name}</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>{_character.createdBy.userName}</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell selectable>{_character.createdBy._id === user.id && <a href={`/characters/${_character._id}`}>Edit</a>}</Table.Cell>
              <Table.Cell>{_character.str}</Table.Cell>
              <Table.Cell>{_character.dex}</Table.Cell>
              <Table.Cell>{_character.con}</Table.Cell>
              <Table.Cell>{_character.int}</Table.Cell>
              <Table.Cell>{_character.wis}</Table.Cell>
              <Table.Cell>{_character.cha}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="10">
            <Button onClick={handleNewCharacter} floated="right" icon labelPosition="left" primary size="small">
              <Icon name="user" /> New Character
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default CharactersTable
