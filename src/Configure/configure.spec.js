import { envThenValue,field,makeConfig,ensureFunction } from 'Configure'
import {identity} from 'core';
let env = {
    PORT: 2222
}

let configure_port = envThenValue('PORT', 12,parseInt,env);
let _noenv;

let configure_port_noenv = envThenValue( 'PORT', 12,parseInt,_noenv);


let configure_port_field = envThenValue('PORT', 12,parseInt);

test("envThenValue default to env", () => {

   
    expect(
        configure_port()
    ).toBe(2222)



})


test("envThenValue: default if no env", () => {

    expect(
        configure_port_noenv()
    ).toBe(12)


})

test("envThenValue given value if value", () => {

    expect(
        configure_port_noenv(14)
    ).toBe(14)


})
test("envThenValue: given value if env & value", () => {
    expect(
        configure_port(124)
    ).toBe(124)


})

test("envThenValue: parse as int", () => {
    expect(
        configure_port("1212")
    ).toBe(1212)


})


test("fieldConfig",()=>{
    const _field = field(configure_port_field,env,'PORT')


    expect(
        _field(12)
    ).toEqual({"PORT": 12})

})

test("field",()=>{
    const _field = field(configure_port_field,env,'PORT')


    expect(
        _field()
    ).toEqual({"PORT": 2222})

})


test("field",()=>{
    const _field = field(configure_port_field,_noenv,'PORT')


    expect(
       _field()
    ).toEqual({"PORT": 12})

})

test("serviceConfig",()=>{


     const ServiceConfig = makeConfig(
        {
            server      : field(envThenValue('NATS_SERVERS','nats://127.0.0.1:4222',identity)),
            server2     : field(envThenValue('NATS_SERVERS','nats://127.0.0.1:4222',identity)),
            port        : field(envThenValue('NATS_SERVERS_WS','nats://127.0.0.1:4222',identity)),
            callback    : field(envThenValue('callback',identity,ensureFunction("callback must be a function"))),
        }
    )
    console.log(ServiceConfig(env)({callback:_=>{}}))
})