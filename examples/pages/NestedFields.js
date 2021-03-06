import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import MaterialUIForm from '../../src/index'
import styles from '../styles'


const formControlStyle = {
  padding: 'inherit',
  margin: 'inherit',
  display: 'inherit',
  border: 'inherit',
}

@withStyles(styles)
export default class NestedFields extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    onSubmitValues: null,
  }

  uploadFile = (event) => {
    console.log(event.target.files) // eslint-disable-line
  }

  submit = (values, pristineValues) => {
    // eslint-disable-next-line no-console
    console.log('submit values:', values, 'pristine values:', pristineValues)
    this.setState({ onSubmitValues: values })
  }

  customInputHandler = (value, { name }, event) => {
    // eslint-disable-next-line no-console
    console.log(value, name, event)
  }

  customToggleHandler = (checked, { name, value }, event) => {
    // eslint-disable-next-line no-console
    console.log(checked, name, value, event)
  }

  render() {
    const { classes } = this.props

    return (
      <Grid
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid item xs className={classes.gridItem}>
          <MaterialUIForm
            className={classes.form}
            style={{ backgroundColor: '#fafafa' }}
            onSubmit={this.submit}
          >
            {'Please fill in the required fields (*)'}
            <TextField
              label="Name"
              name="name"
              value=""
              data-validators="isInt,isRequired"
              onChange={this.customInputHandler}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value=""
              data-validators="isEmail"
              fullWidth
            />

            <fieldset>
              <legend>Custom controlled component</legend>
              {'Upload file:'}
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.uploadFile}
              />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span">
                  Upload
                </Button>
              </label>
            </fieldset>

            <fieldset>
              <legend>FormControl Select</legend>
              <FormControl required data-validators="isInt">
                <InputLabel htmlFor="age-helper">Age</InputLabel>
                <Select value="" name="age">
                  <MenuItem value=""><em>Please select your age ...</em></MenuItem>
                  <MenuItem value={10}>Teens</MenuItem>
                  <MenuItem value={20}>Twenties</MenuItem>
                  <MenuItem value={30}>Thirties</MenuItem>
                  <MenuItem value="40+">Fourties +</MenuItem>
                </Select>
                <FormHelperText>Some important helper text</FormHelperText>
              </FormControl>

              <fieldset>
                <legend>TextField native select</legend>
                <TextField
                  select
                  label="Years left"
                  name="yearsLeft"
                  value="a lot"
                  margin="normal"
                  SelectProps={{ native: true }}
                  fullWidth
                >
                  <option value="a lot">A lot</option>
                  <option value="not many">Not many</option>
                </TextField>

                <fieldset>
                  <legend>FormControlLabel and plain Checkbox</legend>
                  <FormControlLabel
                    control={<Checkbox checked={false} name="use1" value="wisely" />}
                    label="I will use them wisely"
                  />

                  <Checkbox
                    checked
                    name="use2"
                    value="awesomely"
                    onChange={this.customToggleHandler}
                  />
                  <span>I will use them awesomely</span>

                  <FormControl
                    component="fieldset"
                    style={formControlStyle}
                    required
                  >
                    <FormLabel component="legend">
                      RadioGroup FormControl
                    </FormLabel>
                    <RadioGroup
                      name="certainty"
                      value=""
                    >
                      <FormControlLabel
                        value="high"
                        control={<Radio />}
                        label="I swear"
                      />
                      <FormControlLabel
                        value="soso"
                        control={<Radio />}
                        label="Probably"
                      />
                      <FormControlLabel
                        value="low"
                        control={<Radio />}
                        label="Maybe"
                      />
                    </RadioGroup>
                  </FormControl>
                </fieldset>
              </fieldset>
            </fieldset>
            <Button variant="raised" type="reset">Reset</Button>
            <Button variant="raised" type="submit">Submit</Button>
          </MaterialUIForm>
        </Grid>
        <Grid item xs className={classes.gridItem}>
          <pre>
            {this.state.onSubmitValues &&
              JSON.stringify(this.state.onSubmitValues, null, 2)
            }
          </pre>
        </Grid>
      </Grid>
    )
  }
}
