import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import AutocompleteInput from '../src/components/AutocompleteInput'
import Autosuggest from '../src/components/AutosuggestInput'
import CustomTable from '../src/components/CustomTable'
import TextFields from '../src/components/TextFields'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}))

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with emoji', () => (
    <Button>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Autocomplete', module)
  .add('default', () => <div>foo</div>)
  .add('Second', () => <AutocompleteInput suggestions={suggestions} />)

storiesOf('Autosuggest', module)
  .add('default', () => <div>foo</div>)
  .add('Second', () => <Autosuggest suggestions={suggestions} />)

storiesOf('Custom Table', module)
  .add('default', () => <div>foo</div>)
  .add('Second', () => <CustomTable />)

storiesOf('Filled Text Fields', module)
  .add('default', () => <div>foo</div>)
  .add('Second', () => <TextFields />)
