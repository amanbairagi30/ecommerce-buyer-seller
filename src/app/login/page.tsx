import { signup } from "./action";
import { login } from "./action";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="role">Role:</label>
      <select id="role" name="role" required>
        <option value="BUYER">Buyer</option>
        <option value="SELLER">Seller</option>
      </select>
      <button type="submit" formAction={login}>
        Log in
      </button>
      <button type="submit" formAction={signup}>
        Sign up
      </button>
    </form>
  );
}
