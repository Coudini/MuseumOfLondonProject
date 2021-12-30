import { AmplifyTheme } from 'aws-amplify-react-native';

const theme = {
  ...AmplifyTheme,
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#CB0044',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    width: '50%',
    marginHorizontal: '25%',
  },
  buttonDisabled: {
    backgroundColor: '#bc6d87',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    width: '50%',
    marginHorizontal: '25%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionFooterLink: {
    fontSize: 14,
    color: '#b16300',
    alignItems: 'baseline',
    textAlign: 'center',
  },
  inputLabel: {
    marginBottom: 8,
    color: '#CB0044',
  },
  input: {
    paddingTop: 12,
    borderBottomWidth: 1,
    borderRadius: 3,
    borderBottomColor: '#C4C4C4',
    color: '#000',
  },
  sectionHeaderText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  sectionHeader: {
    width: '100%',
    marginBottom: 32,
    paddingTop: 20,
  },
};

export default theme;
