package au.com.memetics;

import com.github.springtestdbunit.bean.DatabaseConfigBean;
import com.github.springtestdbunit.bean.DatabaseDataSourceConnectionFactoryBean;
import org.dbunit.ext.h2.H2DataTypeFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class TestConfig {
    @Bean
    @ConfigurationProperties(prefix = "hibernate.memetics")
    public DataSource dbUnitDataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName(env.getProperty("hibernate.memetics.driverClassName="));
//        dataSource.setUrl(env.getProperty("hibernate.memetics.url"));
//        dataSource.setUsername("sa");
//        dataSource.setPassword("");
//        return dataSource;
        return DataSourceBuilder.create().build();
    }

    @Bean
    public DatabaseConfigBean dbUnitDatabaseConfig() {
        DatabaseConfigBean config = new DatabaseConfigBean();
        config.setDatatypeFactory(new H2DataTypeFactory());
        return config;
    }

    @Bean
    public DatabaseDataSourceConnectionFactoryBean dbUnitDatabaseConnection() {
        DatabaseDataSourceConnectionFactoryBean dataSourceFactory = new DatabaseDataSourceConnectionFactoryBean();
        dataSourceFactory.setDatabaseConfig(dbUnitDatabaseConfig());
        dataSourceFactory.setDataSource(dbUnitDataSource());
        return dataSourceFactory;
    }
}
