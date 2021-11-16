import type { FunctionComponent } from "react";

import React, { useState } from "react";
import { useRouter } from "next/router";

import { useSignupUserMutation } from "generated/client-codegen";

const Signup: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [signup] = useSignupUserMutation();

  return (
    <>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault();
            console.log("submit", name, email);

            await signup({
              variables: {
                data: {
                  name: name,
                  email: email,
                },
              },
            });
            router.push("/");
          }}
        >
          <h1>Signup user</h1>
          <input autoFocus onChange={e => setName(e.target.value)} placeholder="Name" type="text" value={name} />
          <input onChange={e => setEmail(e.target.value)} placeholder="Email address)" type="text" value={email} />
          <input disabled={!name || !email} type="submit" value="Signup" />
          <a className="back" href="#" onClick={() => router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }
        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }
        .back {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default Signup;
