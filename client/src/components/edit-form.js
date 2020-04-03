import React from 'react';
import { withRouter } from 'react-router-dom';
const formInputs = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter pokemon name',
  },
  {
    label: 'Types',
    name: 'type',
    type: 'text',
    placeholder: 'Enter comma separated types',
  },
  {
    label: 'HP',
    name: 'hp',
    type: 'number',
    placeholder: '',
    min: 0,
  },
  {
    label: 'Attack',
    name: 'attack',
    type: 'number',
    min: 0,
    placeholder: '',
  },
  {
    label: 'Defense',
    name: 'defense',
    type: 'number',
    min: 0,
    placeholder: '',
  },
  {
    label: 'Sp. Attack',
    name: 'spAttack',
    type: 'number',
    min: 0,
    placeholder: '',
  },
  {
    label: 'Sp. Defense',
    name: 'spDefense',
    type: 'number',
    min: 0,
    placeholder: '',
  },
  {
    label: 'Speed',
    name: 'speed',
    type: 'number',
    min: 0,
    placeholder: '',
  },
];

class EditForm extends React.Component {
  state = {
    id: '',
    name: '',
    type: '',
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
    customAttrs: [],
  };

  componentDidMount() {
    const data = this.props.data;
    console.log(data);
    const id = this.props.match.params.id;
    const pokemon = data.find(pokemon => pokemon.id === parseInt(id));
    const { name, base, type, customAttrs, id: uid } = pokemon;
    let customAttributes = [];
    if (customAttrs) {
      customAttributes = Object.keys(customAttrs).map(attrName => ({
        attrName: attrName,
        attrValue: customAttrs[attrName],
      }));
    }
    this.setState({
      id: uid,
      name: name.english,
      type: type.join(','),
      hp: base.HP,
      attack: base.Attack,
      defense: base.Defense,
      spAttack: base['Sp. Attack'],
      spDefense: base['Sp. Defense'],
      speed: base['Speed'],
      customAttrs: customAttributes,
    });
  }

  addCustomAttr = () => {
    this.setState(prev => ({
      customAttrs: [
        ...prev.customAttrs,
        {
          attrName: '',
          attrValue: '',
        },
      ],
    }));
  };
  handleCustomAttrChange = idx => e => {
    const { name, value } = e.target;
    this.setState(prev => ({
      customAttrs: prev.customAttrs.map((attr, index) =>
        idx === index ? { ...attr, [name]: value } : attr,
      ),
    }));
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const {
      name,
      type,
      hp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed,
      customAttrs,
      id,
    } = this.state;
    const customAttributes = {};
    customAttrs.forEach(({ attrName, attrValue }) => (customAttributes[attrName] = attrValue));
    const data = {
      id,
      name: {
        english: name,
        japanese: name,
        chinese: name,
      },
      type: type.split(','),
      base: {
        HP: hp,
        Attack: attack,
        Defense: defense,
        'Sp. Attack': spAttack,
        'Sp. Defense': spDefense,
        Speed: speed,
      },
      customAttrs: customAttributes,
    };
    this.props.updatePokemon(data);
    this.props.history.push('/');
  };

  render() {
    const { customAttrs } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          {formInputs.map(({ label, name, type, ...inputAttrs }) => (
            <label key={name}>
              {label}
              <input
                name={name}
                type={type}
                value={this.state[name]}
                onChange={this.handleInputChange}
                {...inputAttrs}
              />
            </label>
          ))}
          {customAttrs.length
            ? customAttrs.map((attr, idx) => (
                <React.Fragment key={idx}>
                  <label>
                    Property Name
                    <input
                      name='attrName'
                      value={attr.attrName}
                      onChange={this.handleCustomAttrChange(idx)}
                    />
                  </label>
                  <label>
                    Property Value
                    <input
                      name='attrValue'
                      value={attr.attrValue}
                      onChange={this.handleCustomAttrChange(idx)}
                    />
                  </label>
                </React.Fragment>
              ))
            : null}
          <button type='button' onClick={this.addCustomAttr}>
            Add custom property
          </button>
          <input type='submit' value='add' />
        </form>
      </div>
    );
  }
}

export default withRouter(EditForm);
