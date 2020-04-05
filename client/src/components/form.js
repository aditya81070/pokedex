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

class Create extends React.Component {
  state = {
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
  addCustomAttr = () => {
    this.setState((prev) => ({
      customAttrs: [
        ...prev.customAttrs,
        {
          attrName: '',
          attrValue: '',
        },
      ],
    }));
  };
  handleCustomAttrChange = (idx) => (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      customAttrs: prev.customAttrs.map((attr, index) =>
        idx === index ? { ...attr, [name]: value } : attr,
      ),
    }));
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, type, hp, attack, defense, spAttack, spDefense, speed, customAttrs } = this.state;
    const customAttributes = {};
    customAttrs.forEach(({ attrName, attrValue }) => (customAttributes[attrName] = attrValue));
    const data = {
      name: {
        english: name,
        japanese: name,
        chinese: name,
      },
      type: type.split(',').filter((t) => String(t).trim()),
      base: {
        HP: hp,
        Attack: attack,
        Defense: defense,
        SpAttack: spAttack,
        SpDefense: spDefense,
        Speed: speed,
      },
      customAttrs: customAttributes,
    };
    fetch(`${process.env.REACT_APP_API_URL}/pokemons`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          this.props.history.push('/');
        } else {
          console.log('can not add item');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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

export default withRouter(Create);
