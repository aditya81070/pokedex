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
    loading: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          const pokemon = data.data;
          const { name, base, type, customAttrs, id: uid } = pokemon;
          let customAttributes = [];
          if (customAttrs) {
            customAttributes = Object.keys(customAttrs).map((attrName) => ({
              attrName: attrName,
              attrValue: customAttrs[attrName],
            }));
          }
          this.setState({ loading: false });
          this.setState({
            id: uid,
            name: name.english,
            type: type.join(','),
            hp: base.HP,
            attack: base.Attack,
            defense: base.Defense,
            spAttack: base.SpAttack,
            spDefense: base.SpDefense,
            speed: base.Speed,
            customAttrs: customAttributes,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

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
        SpAttack: spAttack,
        SpDefense: spDefense,
        Speed: speed,
      },
      customAttrs: customAttributes,
    };
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`, {
      method: 'PUT',
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
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { customAttrs } = this.state;
    return this.state.loading ? (
      <p>Loading the form...</p>
    ) : (
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
