/* eslint-disable react/prop-types */
export default function LoginForm({ onSubmit, username, setUsername, password, setPassword }) {
    return (
      <>
        <div>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </>
    );
  }
  