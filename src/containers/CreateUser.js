import { connect } from 'react-redux';
import { createUser } from '../redux/actions/user/action';
import AddPlayer from '../components/AddPlayer';

const mapDispatchToProps = dispatch => {
    return {
        onAddUser: user => {
            dispatch(createUser(user))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddPlayer);